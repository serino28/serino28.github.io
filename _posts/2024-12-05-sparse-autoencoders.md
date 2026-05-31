---
title: "Unmixing Superposition: A Field Guide to Sparse Autoencoders"
description: "How sparse autoencoders turn a model's tangled, polysemantic activations into a long dictionary of features you can read, name, and steer with."
date: 2024-12-05
tags: [Interpretability, SAEs]
lang: en
alt_url: /it/research/sparse-autoencoders/
---

In the [previous note]({{ '/research/linear-representations-superposition/' | relative_url }})
we ended on a problem. Concepts live as **directions** in activation space, but the
model packs far more of them than it has dimensions (superposition), so they spill
across neurons and any single neuron lights up for a meaningless jumble of unrelated
things (polysemanticity). Staring at neurons tells you almost nothing.

So here is the question this note is about: if the clean concepts are still in there,
tangled and overlapping, **how do we pull them back out?** The current best answer is a
surprisingly small neural network called a **sparse autoencoder (SAE)**.

## A dictionary, not a microscope

The trick is to stop *inspecting* the activation and start *re-describing* it. Take a
single activation vector and try to write it as a sum of a few building blocks drawn
from a big, fixed set:

```text
activation  ≈  0.9 · "French"  +  0.4 · "about money"  +  0.2 · "formal tone"
```

That big set of building blocks is a **dictionary**, and each entry is a candidate
concept direction. This is *dictionary learning*: explain every vector as a sparse
combination of dictionary atoms. The hope is that the atoms line up with human-meaningful
features even though the raw neurons never did. An SAE is just the machine that learns
this dictionary.

## The architecture is almost embarrassingly simple

An SAE is an autoencoder with one wide, sparse hidden layer. As the figure spells out, the
job is to map an activation `x ∈ R^{d_model}` into a much larger dictionary
`f ∈ R^{d_SAE}`, where `d_SAE = F · d_model` and the **expansion factor** `F` is what makes
the hidden layer *overcomplete*. It does two things:

- **Encode.** Subtract a bias, project up into the feature space, and keep only the
  positive part: `f = ReLU(W_enc (x − b_dec) + b_enc)`. Each entry of `f` is "how strongly
  feature *i* is firing."
- **Decode.** Rebuild the original activation from those features: `x̂ = W_dec · f + b_dec`.
  The **rows of `W_dec` are the feature directions** themselves, and the reconstruction is
  just a weighted sum of the active ones.

<figure>
  <img src="{{ '/assets/img/posts/sae-architecture.png' | relative_url }}"
       alt="Hand-drawn schematic of a sparse autoencoder. On the left a d_model activation vector x feeds into an 'encoder' trapezoid containing x' = x − b_dec, W_enc·x' + b_enc and a ReLU. In the middle a tall vertical bar labelled 'sparse latent space' of size F·d_model holds the features f. On the right a 'decoder' trapezoid with W_dec·f + b_dec reconstructs the vector x-hat. Two formulas are written below: f = ReLU(W_enc(x − b_dec) + b_enc) and x-hat = W_dec·f + b_dec.">
  <figcaption>The whole machine, left to right: a <code>d_model</code> activation is encoded (subtract <code>b_dec</code>, multiply by <code>W_enc</code>, ReLU) into a tall, sparse dictionary of size <code>d_SAE = F · d_model</code>, then decoded back to a reconstruction. Width buys resolution; sparsity buys meaning. (After Cunningham et&nbsp;al., <em>Sparse Autoencoders Find Interpretable Features in Language Models</em>, EleutherAI.)</figcaption>
</figure>

Why make it overcomplete? Superposition crammed many concepts into few neurons, so to
undo it we need *more* slots than the model had, with room for each concept to claim its
own.

## Sparsity is the whole trick

A wide hidden layer alone would just learn a lazy copy of the input. The magic is in the
training objective, which pulls in two directions at once: **reconstruct well** (the
rebuilt `x̂` should match `x`, a standard squared-error term) and **use few features**
(most of `f` should be zero on any given input, a sparsity penalty, classically an L1 term
on `f`).

That second term is doing the real work. Forcing the SAE to explain each input with only
a handful of active features mirrors the quiet fact that made superposition possible in
the first place: at any moment, **almost all concepts are absent**. A dictionary that
respects this tends to discover features that are *monosemantic*, each one firing for a
single, nameable thing instead of a neuron's grab-bag.

## Where the simple recipe leaks

The L1 recipe works, but it has a well-known flaw. The penalty punishes *magnitude*, not
just *presence*, so the SAE learns to underestimate how strongly a feature is really on,
just to keep the penalty down. This **activation shrinkage** biases the features and hurts
reconstruction. A second failure mode is **dead features**: latents that, once they stop
firing during training, never come back.

Most of the recent progress is about fixing exactly this:

- **Gated SAEs** split the decision *whether* a feature is on from *how much* it is on, so
  the sparsity pressure stops dragging down the magnitudes.
- **TopK SAEs** drop the L1 term entirely and instead keep only the *K* largest feature
  activations per input. Sparsity becomes an exact constraint rather than a soft nudge,
  which sidesteps shrinkage.
- **JumpReLU** uses a learned threshold so a feature contributes nothing until it crosses a
  bar, then passes through at full strength.

The throughline: the cleaner you can enforce "few features, at honest magnitudes," the
more trustworthy the dictionary.

## Two things you can do with a feature

Once the SAE is trained, every feature is both something you can *read* and a direction you
can *use*.

**Read it.** Run an input through the model, grab the activation, and encode it. At the
sparse layer only a handful of features switch on, and *those* are your interpretation. In
the figure below we take the activation of GPT-2 at layer 11 for a short, deliberately ugly
prompt, encode it, and stop at the sparse layer: one latent, cell 10335, lights up, and it
turns out to track references to women and their rights. We never even run the decoder. The
active features *are* the reading.

<figure>
  <img src="{{ '/assets/img/posts/sae-interpret.png' | relative_url }}"
       alt="Hand-drawn diagram titled 'Interpreting an LLM'. The prompt 'I hate women' produces a GPT-2 layer-11 activation x, which is fed into an encoder. The output is a tall sparse vector of mostly zeros with one cell highlighted in red. An arrow from that cell, labelled 'cell 10335', points to the text 'references to women and their rights or issues'. The decoder is sketched faintly but unused.">
  <figcaption>Interpretation: encode an activation and stop at the sparse layer. For this prompt feature 10335 fires, a latent that tracks references to women and their rights or issues. The decoder is drawn but unused, the active feature is the whole answer.</figcaption>
</figure>

**Use its direction.** Every feature also owns a direction in the decoder matrix, the
vector it writes back into the model when it fires. Pick a feature, walk into its row of
`W_dec`, and you can read off, amplify, or ablate the concept it carries. In the next
figure we take a different latent, feature 11149, pull its row out of the decoder matrix,
and recover a direction that stands for terms and phrases tied to hate speech and hate
crimes. That decoder direction is the handle you grab when you want to *steer* behaviour
rather than just observe it, which is exactly where the safety thread from the
[first note]({{ '/research/linear-representations-superposition/' | relative_url }}) picks
back up.

<figure>
  <img src="{{ '/assets/img/posts/sae-decoder-direction.png' | relative_url }}"
       alt="Hand-drawn diagram. The same 'I hate women' prompt is encoded into a sparse vector with one cell highlighted. An arrow labelled 'cell 11149' leads to the decoder matrix, drawn as an m-by-m grid; row 11149 is pulled out as a horizontal bar. A second arrow from that row points to the text 'terms and phrases related to hate speech and hate crimes'.">
  <figcaption>Control: pick a feature in the sparse layer and walk into the decoder matrix <code>W_dec</code>; its row is the reconstructed latent direction the feature writes back. Here feature 11149 recovers a direction for hate-speech-related terms, the kind of direction you can amplify or ablate to steer the model.</figcaption>
</figure>

## An SAE hands you 16,000 features. Now what?

Reading one feature by hand is easy. A good SAE leaves you with *tens of thousands* of
them and no labels, and reading them by hand does not scale. So the standard move is
**auto-interpretability**: show a language model the inputs that make a feature fire
hardest and ask it to write a short description ("references to women and their rights,"
"fires on the color green"). Cheap, fast, and very easy to *over-trust*.

## How do you grade an explanation?

This is the question my own work lives in. An auto-generated label can sound perfectly
reasonable and still be wrong. The standard way to check it is **simulation-based
scoring**: hand the explanation to a model, have it predict when the feature should fire,
and see how well that matches reality. It is faithful but expensive, because every
explanation needs a fresh round of model calls.

In **SFAL** (*Semantic-Functional Alignment Scores*, EMNLP 2025) we take a cheaper route.
Instead of simulating behaviour, we ask whether the *semantics* of an explanation line up
with the *function* of the feature, comparing them with embedding-based similarity. The
result is a fast, scalable signal for whether an auto-generated label actually tracks what
the feature does. It is interpretability turned on itself: interpreting the interpreters.

## A necessary dose of doubt

SAEs are the best tool we have, not a solved problem. A dictionary can reconstruct
beautifully and still mislead: features **split** (one concept smeared across many
near-duplicate latents) or **compose** in ways that do not match how the model actually
uses them, and reconstructing an activation is not the same as capturing the computation
that produced it. This is why evaluation has to grow up alongside the methods, and why
"the feature looks meaningful" can never be the end of the sentence.

## The one-paragraph version

Superposition leaves concepts tangled across polysemantic neurons. A **sparse
autoencoder** untangles them by re-describing each activation as a sparse combination of an
overcomplete **dictionary** of learned directions, trading off reconstruction against
sparsity so that features come out **monosemantic**. The classic L1 penalty causes
shrinkage, which newer variants (Gated, TopK, JumpReLU) clean up. Each feature is then
something you can **read** (which latents fire) and a decoder **direction** you can use to
**steer**, while **auto-interpretability** names them at scale and work like
[SFAL]({{ '/#publications' | relative_url }}) scores those names, because a plausible
explanation is not yet a correct one.

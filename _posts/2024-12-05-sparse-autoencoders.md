---
title: "Sparse Autoencoders: Recovering Interpretable Features from Superposition"
description: "How sparse autoencoders decompose a model's activations into an overcomplete dictionary of latents, and how those latents are explained and scored by current auto-interpretability pipelines."
date: 2024-12-05
tags: [Interpretability, SAEs]
image: /assets/img/posts/sae-architecture.png
lang: en
alt_url: /it/research/sparse-autoencoders/
---

In the [previous note]({{ '/research/linear-representations-superposition/' | relative_url }})
we saw why you cannot read a model neuron by neuron. Concepts are represented as
**directions** in activation space (the linear representation hypothesis), and the model
stores more of them than it has dimensions by placing them in **superposition**, which
leaves individual neurons **polysemantic**. The practical question that follows is how to
recover those directions. The dominant approach today is the **sparse autoencoder (SAE)**:
a small network trained to decompose activations into a large, sparse set of **latents**
that are intended to be **monosemantic**.

A note on vocabulary I will keep throughout: a *latent* is a unit the SAE learns; a
*feature* is the underlying concept we hope it captures. Keeping them distinct matters,
because not every latent turns out to be a clean feature.

## Dictionary learning over activations

An SAE is an instance of **dictionary learning**. Given an activation vector `x` taken
from some site in the model (typically the **residual stream** at a chosen layer), we
model it as a sparse, non-negative linear combination of a fixed, **overcomplete** set of
directions:

```text
x  ≈  f₁·d₁ + f₂·d₂ + … + fₘ·dₘ        with most fᵢ = 0
```

The directions `dᵢ` form the **dictionary** (the decoder), and the coefficients `fᵢ` are
the **latent activations**. For any given input almost all coefficients are zero, so each
activation is explained by a handful of dictionary elements. The hypothesis is that, under
enough sparsity, these dictionary directions recover the underlying features that
superposition had entangled, even though no individual neuron did.

## The sparse autoencoder architecture

An SAE is an autoencoder with one wide, sparse hidden layer. As the figure spells out, it
maps an activation `x ∈ R^{d_model}` into a much larger dictionary `f ∈ R^{d_SAE}`, where
`d_SAE = F · d_model` and the **expansion factor** `F` makes the hidden layer
*overcomplete*. It has two parts:

- **Encoder.** Subtract a bias, project up into the latent space, and apply a nonlinearity:
  `f = ReLU(W_enc (x − b_dec) + b_enc)`. Each entry of `f` is the activation of one latent.
- **Decoder.** Reconstruct the activation as a weighted sum of dictionary directions:
  `x̂ = W_dec · f + b_dec`. The **rows of `W_dec` are the latent directions** (the
  dictionary atoms).

<figure>
  <img src="{{ '/assets/img/posts/sae-architecture.png' | relative_url }}"
       alt="Hand-drawn schematic of a sparse autoencoder. On the left a d_model activation vector x feeds into an 'encoder' trapezoid containing x' = x − b_dec, W_enc·x' + b_enc and a ReLU. In the middle a tall vertical bar labelled 'sparse latent space' of size F·d_model holds the latents f. On the right a 'decoder' trapezoid with W_dec·f + b_dec reconstructs the vector x-hat. Two formulas are written below: f = ReLU(W_enc(x − b_dec) + b_enc) and x-hat = W_dec·f + b_dec.">
  <figcaption>The encoder maps a <code>d_model</code> activation into an overcomplete latent space of size <code>d_SAE = F · d_model</code>; the decoder reconstructs it as a sparse weighted sum of dictionary directions. (After Cunningham et&nbsp;al., <em>Sparse Autoencoders Find Highly Interpretable Features in Language Models</em>, EleutherAI.)</figcaption>
</figure>

The dictionary is deliberately overcomplete: superposition packed many concepts into few
neurons, so to undo it the latent space needs more slots than the model had, with room for
each concept to claim its own.

## The training objective: reconstruction and sparsity

An SAE is trained on the model's own activations with a loss made of two competing terms:
a **reconstruction** term, the squared error `‖x − x̂‖²`, and a **sparsity** term that
pushes the latent vector toward zero. In the original formulation the sparsity term is an
**L1 penalty** `λ‖f‖₁`, and `λ` sets the trade-off.

Because the two terms pull against each other, an SAE is never judged at a single operating
point. It is evaluated along the **reconstruction-sparsity Pareto frontier**, trading
reconstruction fidelity (often reported as the fraction of the model's loss recovered when
`x̂` is patched back in, or as explained variance) against sparsity (the average number of
active latents per input, the **L0**). The point of the sparsity pressure is
**monosemanticity**: forcing each input to be explained by few latents tends to align those
latents with single, human-nameable concepts rather than the entangled mixtures that
neurons carry.

## Failure modes of the L1 sparse autoencoder

The vanilla L1 SAE has two well-documented problems.

**Activation shrinkage (feature suppression).** The L1 penalty acts on the *magnitude* of
the latents, not only on whether they are active, so minimizing it systematically biases
latent activations downward. The encoder learns to under-estimate how strongly a latent
fires, which both degrades reconstruction and distorts the quantities we want to read off.

**Dead latents.** Over training, many latents stop activating entirely and never recover,
wasting dictionary capacity.

Most recent architectures target these issues directly:

- **Gated SAEs** (Rajamanoharan et al., 2024) separate the decision of *which* latents are
  active from the estimate of *how* active they are, decoupling the L1 pressure from the
  magnitudes and reducing shrinkage.
- **TopK SAEs** (Gao et al., 2024) replace the L1 penalty with a hard constraint that keeps
  only the `K` largest latent activations per input, making sparsity exact and removing the
  shrinkage bias by construction.
- **JumpReLU SAEs** (Rajamanoharan et al., 2024) use a learned per-latent threshold so a
  latent contributes nothing until it crosses its bar, then passes through at full strength,
  improving the reconstruction-sparsity frontier.

The shared goal is a dictionary that is sparse and faithful at the same time.

## Two uses of a latent: interpretation and intervention

Once trained, a latent supports two complementary operations.

**Interpretation (reading).** Encode an activation and inspect which latents are active.
Because the code is sparse, only a few latents fire, and they are the interpretation of
that activation. The figure below encodes the residual-stream activation of GPT-2 at layer
11 for a short prompt; a single latent (index 10335) activates, and its max-activating
examples show that it tracks references to women and their rights. The decoder is not even
needed here: the active latents are the readout.

<figure>
  <img src="{{ '/assets/img/posts/sae-interpret.png' | relative_url }}"
       alt="Hand-drawn diagram titled 'Interpreting an LLM'. The prompt 'I hate women' produces a GPT-2 layer-11 activation x, which is fed into an encoder. The output is a tall sparse vector of mostly zeros with one cell highlighted in red. An arrow from that cell, labelled 'cell 10335', points to the text 'references to women and their rights or issues'. The decoder is sketched faintly but unused.">
  <figcaption>Interpretation: encode an activation and stop at the latent layer. For this prompt latent 10335 fires, and its max-activating examples track references to women and their rights or issues. The decoder is drawn but unused.</figcaption>
</figure>

**Intervention (steering).** Every latent also has a **decoder direction**, the vector it
adds back to the residual stream when it fires, which makes latents causal handles. Adding a
latent's decoder direction amplifies its concept; **ablating** it (clamping the latent to
zero, or subtracting its direction) removes it. This is the basis of **feature steering**, a
more targeted alternative to steering with raw activation differences. The next figure takes
latent 11149, reads its row out of the decoder matrix, and recovers a direction associated
with hate-speech-related terms, exactly the kind of direction one would ablate to suppress
that behaviour. This is where the safety thread from the
[first note]({{ '/research/linear-representations-superposition/' | relative_url }}) resumes:
if an unsafe concept is a recoverable direction, it is also an intervenable one.

<figure>
  <img src="{{ '/assets/img/posts/sae-decoder-direction.png' | relative_url }}"
       alt="Hand-drawn diagram. The same 'I hate women' prompt is encoded into a sparse vector with one cell highlighted. An arrow labelled 'cell 11149' leads to the decoder matrix, drawn as an m-by-m grid; row 11149 is pulled out as a horizontal bar. A second arrow from that row points to the text 'terms and phrases related to hate speech and hate crimes'.">
  <figcaption>Intervention: pick a latent in the sparse layer and read its row out of the decoder matrix <code>W_dec</code>; that row is the direction the latent writes back into the residual stream. Here latent 11149 recovers a direction for hate-speech-related terms, a direction you can amplify or ablate to steer the model.</figcaption>
</figure>

## Auto-interpretability: generating explanations

A useful SAE produces tens of thousands of latents, far too many to label by hand, so
explanations are generated automatically. The standard **auto-interpretability** pipeline
(introduced for individual neurons by Bills et al., 2023, and now run over SAE latents at
scale by efforts such as EleutherAI's auto-interp and Neuronpedia) has two stages.

1. **Collect activating examples.** Run a large text corpus through the model and the SAE,
   and for each latent record the contexts where it fires, keeping the token-level
   activation values. In practice one gathers the **max-activating examples** and also
   samples from lower activation quantiles, so the explanation is not biased by only the
   most extreme cases.
2. **Generate an explanation.** Pass these contexts, with the activating tokens and their
   strengths marked, to an **explainer model** (a capable LLM), and prompt it to describe in
   natural language what the latent responds to, for example *"fires on references to women
   and their rights."* The output is a short, human-readable hypothesis about the latent's
   selectivity.

## Scoring explanations: simulation, detection, and alignment

An explanation is only a hypothesis, and a fluent one can be wrong, so it must be **scored**
against the latent's actual behaviour. There are three broad families.

**Simulation scoring** (Bills et al., 2023). A separate **simulator model** is given only
the explanation and asked to predict the latent's activation on each token of held-out text.
The score is the correlation between the predicted and the true activation profiles. It is
the most faithful measure, and also the most expensive, since it needs per-token predictions
over many contexts for every latent.

**Detection scoring** (Paulo et al., 2024). Instead of reproducing the full activation
profile, the simulator is given the explanation together with a balanced mix of activating
and non-activating contexts and asked to classify which ones the latent fires on. Scoring by
detection accuracy (or AUC) is far cheaper than full simulation and scales to millions of
latents; a **fuzzing** variant instead asks the model to judge whether the highlighted
tokens are the correct ones.

**Intervention scoring.** A stricter, causal check: use the explanation to predict the
effect of steering or ablating the latent, and verify that the behavioural change matches the
prediction.

All three re-run a model for every explanation. **SFAL** (*Semantic-Functional Alignment
Scores*, EMNLP 2025) takes a different route: rather than simulating behaviour, it compares
the **semantics** of the explanation with the **function** of the latent (summarized from its
activating examples) using embedding-based similarity, yielding a fast, scalable,
distributional signal for how well an explanation tracks what the latent does. The framing is
interpretability applied to its own outputs: scoring the explanations instead of trusting
them.

## Caveats: faithfulness, feature splitting, and absorption

SAEs are the current state of the art, not a solved problem, and several failure modes are
now well understood.

- **Reconstruction is not computation.** A dictionary can reconstruct activations accurately
  while still mischaracterizing how the model uses them; low reconstruction error does not
  imply causal relevance.
- **Feature splitting.** As the dictionary grows, a single concept can fragment across many
  near-duplicate latents, so a feature is spread thin rather than captured once.
- **Feature absorption** (Chanin et al., 2024). A broad latent can quietly absorb a more
  specific one, so a latent stops firing on cases its explanation plainly covers. This
  inflates apparent interpretability while breaking it.
- **Composition and non-monosemantic latents.** Some latents remain mixtures, and others only
  make sense in combination with others.

These are exactly why scoring and evaluation have to mature alongside the dictionaries: an
explanation that looks meaningful is a starting point, not a conclusion.

## Summary

Superposition entangles features across polysemantic neurons. A sparse autoencoder recovers
them by learning an overcomplete **dictionary** and decomposing each activation into a sparse
set of **latents**, trading reconstruction against sparsity to push those latents toward
**monosemanticity**. The original L1 objective causes **activation shrinkage** and **dead
latents**, which **Gated**, **TopK**, and **JumpReLU** variants address. Each latent can be
**read** (which latents are active) and **used** as a causal direction (steering and
ablation). Because a good dictionary yields far too many latents to label by hand,
**auto-interpretability** generates explanations from max-activating examples, and scoring
methods (**simulation**, **detection**, **intervention**, and embedding-based approaches such
as [**SFAL**]({{ '/#publications' | relative_url }})) measure whether those explanations
actually match the latents' behaviour, because a plausible explanation is not yet a correct
one.

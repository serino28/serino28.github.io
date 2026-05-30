---
title: "Mechanistic Interpretability, From Scratch"
description: "What it means to reverse-engineer a language model — features, directions in activation space, and why a single direction can tell safe from unsafe."
date: 2026-05-30
tags: [Interpretability, LLMs, Safety]
---

Large language models work astonishingly well, and we mostly have no idea *why*. We
can measure *what* they do — accuracy, benchmarks, win rates — but the computation
that turns a prompt into an answer happens inside billions of parameters we never
designed by hand. **Mechanistic interpretability** (mech interp) is the attempt to
reverse-engineer that computation: to go from "the model behaves like X" to "*here
is the circuit that implements X*."

This post is a from-scratch tour of the core ideas, and along the way I'll point to
the questions my own research tries to answer.

## The residual stream is a workspace

A Transformer doesn't process a token in one shot. Each layer *reads* from a shared
vector — the **residual stream** — does a bit of computation, and *writes* its result
back by addition:

```text
x_{layer+1} = x_layer + attention(x_layer) + mlp(x_layer)
```

Because every contribution is *added*, the residual stream behaves like a
communication channel that all layers share. Information written early can be read
much later. This is the first big idea: **the model's "thoughts" live as vectors in
this stream**, and interpretability is largely about figuring out what those vectors
mean.

## Features are directions, not neurons

The tempting assumption is "one neuron = one concept." It's almost never true.
Instead, a *concept* — say, "this text is in French," or "this request is unsafe" —
tends to correspond to a **direction** in activation space. To check whether the
model is representing that concept, you project the activation onto the direction
and read off the magnitude.

> A useful mental model: the activation vector is a chord, and each feature is a note.
> The model plays many notes at once, and interpretability is learning to hear them
> individually.

This matters enormously for safety. If a concept like "harmful intent" is linear and
*findable*, you can monitor it, or even steer it, without retraining the model.

## Superposition: more features than dimensions

Here's the complication. Models seem to represent **far more features than they have
neurons**, by packing them into overlapping directions — a phenomenon called
**superposition**. It's efficient for the model but hostile to interpretation: any
single neuron lights up for a messy mixture of unrelated concepts (*polysemanticity*).

**Sparse autoencoders (SAEs)** are the current workhorse for untangling this. An SAE
is trained to reconstruct activations using a large, sparse set of latent features —
the hope being that each learned feature corresponds to one human-meaningful concept.

The catch: an SAE can give you *thousands* of features, and you still have to figure
out what each one means. That naturally leads to **auto-interpretability** — using an
LLM to write a natural-language label for each feature.

## How do we know the explanations are any good?

This is exactly where one of our papers lives. Auto-interp is cheap to produce and
easy to *trust too much*. The standard way to validate an explanation is
simulation-based scoring: show the explanation to a model and ask it to predict when
the feature fires. Accurate, but expensive.

In **SFAL** (*Semantic-Functional Alignment Scores*, EMNLP 2025), we ask a simpler
question: does the *semantics* of an explanation match the *function* of the feature?
Instead of running costly simulations, SFAL compares embedding-based semantic
similarity, giving a fast, scalable signal for whether an auto-generated explanation
actually tracks the feature's behaviour. It's a way to evaluate interpretability
itself — interpreting the interpreters.

## One direction to separate safe from unsafe

If features really are directions, the boldest version of the hypothesis is: maybe a
high-level, safety-relevant concept collapses onto a *single* direction.

That's the result behind **"Safe-Unsafe Concept Separation Emerges from a Single
Direction"** (EACL 2026). We locate the layer where safe and unsafe concepts are
*maximally separable* in a pretrained model's activation space, and show that a simple
linear classifier on internal representations provides robust safeguarding —
**without touching the model's weights**, and holding up across 8 domains, 3 tasks,
and 16 non-English languages.

The takeaway connects the whole chain of ideas above: residual stream → linear
features → a single, multilingual safety direction you can read out cheaply.

## Where this is going

Mech interp is still young, and most of the map is blank. The questions I find most
exciting right now:

- **Faithfulness.** When an SAE feature *looks* meaningful, is it actually causal, or
  just correlated? Evaluation (like SFAL) has to grow up alongside the methods.
- **Generality.** Do the directions we find transfer across models, languages, and
  domains — or are we overfitting to one checkpoint?
- **Control.** If we can *read* a concept, when is it safe to *write* it — to steer
  behaviour by editing activations?

If any of this is your kind of problem, [get in touch]({{ '/#contact' | relative_url }}) —
I'd love to compare notes.

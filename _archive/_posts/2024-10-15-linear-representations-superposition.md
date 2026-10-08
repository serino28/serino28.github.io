---
title: "Linear Representations and Superposition: How Models Represent Concepts"
description: "Why concepts are encoded as directions rather than neurons (the linear representation hypothesis), how superposition lets a model represent more features than it has dimensions, and why that leaves individual neurons polysemantic."
date: 2024-10-15
tags: [Interpretability, Foundations]
image: /assets/img/posts/feature-as-direction.png
lang: en
alt_url: /it/research/linear-representations-superposition/
---

Mechanistic interpretability rests on a claim about *where* meaning lives inside a neural
network. The naive expectation is that each neuron encodes one concept, so that reading a
model would amount to locating the "French neuron" or the "sentiment neuron." That
expectation is almost entirely wrong, and understanding why is the foundation for
everything that follows, including the sparse autoencoders covered in the
[next note]({{ '/research/sparse-autoencoders/' | relative_url }}). This note develops the
three ideas that together explain how language models actually represent what they know: the
**linear representation hypothesis**, **superposition**, and **polysemanticity**.

## The linear representation hypothesis

Take the model's internal state at a given layer to be a vector in a high-dimensional
**activation space** (for a mid-size model, on the order of a thousand dimensions). The
**linear representation hypothesis** states that human-interpretable concepts are encoded
as *directions* in that space: a concept corresponds to a vector, and the extent to which
the model represents that concept on a given input is, to a first approximation, the
projection of the activation onto that direction.

A **feature** is therefore a direction, not a neuron. To test whether the model represents
"this text is in French," you do not inspect a single coordinate; you take the dot product
of the activation with the French direction and read off its magnitude. The earliest
evidence for this picture is the linear structure of word embeddings, where semantic
relations appear as consistent vector offsets (Mikolov et al., 2013).

<figure>
  <img src="{{ '/assets/img/posts/linearity-word2vec.png' | relative_url }}"
       alt="Hand-drawn vector diagram with the words king, queen, man and woman, arranged so that the move from man to king matches the move from woman to queen.">
  <figcaption>The linear structure of word embeddings: semantic relations appear as consistent vector offsets, with <em>king − man + woman ≈ queen</em>. This linearity in the input space is the first evidence that meaning is encoded in directions. (Mikolov et&nbsp;al., 2013; Park et&nbsp;al., 2024.)</figcaption>
</figure>

Applied to internal activations rather than input embeddings, the same idea is what makes
interpretability tractable: if a concept is a direction, it can be located, measured,
monitored, and edited with linear tools.

<figure>
  <img src="{{ '/assets/img/posts/feature-as-direction.png' | relative_url }}"
       alt="Hand-drawn 3D axes labelled neuron 1, 2 and 3, with a red 'concept direction' arrow that blends all three axes instead of lining up with any one of them.">
  <figcaption>A feature is a direction, not a neuron: a unit vector composed of many neurons at once, sitting at its own angle to the coordinate axes. (Elhage et&nbsp;al., <em>A Mathematical Framework for Transformer Circuits</em>, Anthropic.)</figcaption>
</figure>

## No privileged basis: meaning is in directions, not coordinates

If features are directions, the individual neuron axes carry no special status, and a
standard argument makes this precise. Apply an orthogonal rotation to the coordinate
system, leaving the activation vectors themselves unchanged and only turning the axes
against which we read them. Every neuron *value* changes, but every angle and dot product
between vectors is preserved. Since the linear-representation readout depends only on dot
products, the model's represented content is invariant to the rotation, while any
interpretation pinned to a specific neuron is destroyed by it.

<figure>
  <img src="{{ '/assets/img/posts/basis-rotation.png' | relative_url }}"
       alt="Two side-by-side hand-drawn diagrams of the same vectors under different axis orientations; the angle theta between the activation and the concept direction is identical in both.">
  <figcaption>Rotating the coordinate axes changes every neuron value but preserves all angles and dot products. The represented content (the projection onto the concept direction, the angle θ) is invariant; any neuron-pinned interpretation is not.</figcaption>
</figure>

This is the sense in which the activation space has **no privileged basis**: the coordinate
axes are an arbitrary reference frame, and meaning lives in the relative geometry of the
directions. There is an important qualification, because not every space inside a
transformer is rotation-invariant:

- The **residual stream**, the shared activation space that components read from and write
  to, genuinely has no privileged basis. A rotation can be absorbed into the surrounding
  weight matrices without changing the network's function, so reading a single
  residual-stream dimension in isolation is meaningless.
- The **MLP hidden layer** is different. Its element-wise nonlinearity (ReLU, GELU) acts on
  each coordinate independently, which *does* privilege the basis: rotating that space
  changes the function the layer computes, so there the neuron axes are meaningful objects.

The decisive observation is that even where the basis is privileged, features still do not
align with neurons. The axes are fixed, yet the directions the model uses sit at their own
angles to them. That misalignment is not an accident; it is the signature of superposition.

## Superposition: representing more features than dimensions

A model needs to represent far more concepts than it has dimensions: a layer with a few
thousand dimensions tracks vastly more than a few thousand distinguishable properties of
its input. **Superposition** is how it reconciles this. The model encodes more feature
directions than there are dimensions by allowing them to be only *approximately* orthogonal
and to interfere slightly.

Two facts make this work. First, high-dimensional spaces contain exponentially many
*almost-orthogonal* directions, so a large number of features can coexist with small
pairwise interference. Second, natural data is **sparse**: at any moment almost every
concept is absent, since a sentence about a French recipe is not simultaneously about
quantum field theory, basketball, and contract law. Because only a few features are active
at once, their directions rarely collide, and the model can decode them despite the
overlap. Superposition is, in effect, a learned compression scheme that trades a little
interference for a large gain in representational capacity (Elhage et al.,
*Toy Models of Superposition*, 2022).

## Polysemanticity: why individual neurons look meaningless

Superposition has a direct, observable consequence. Because feature directions are not
aligned with the neuron basis, any single neuron participates in many unrelated features at
once. Inspecting it shows activation across a seemingly arbitrary mixture, for example
academic citations, the color green, and a particular grammatical construction. This is
**polysemanticity**, and it is why neuron-level inspection is unreliable: the neuron is not
malfunctioning, it simply was never the unit of representation. The structure lives in
directions that cut across neurons, and recovering a one-concept-per-unit description, that
is **monosemanticity**, requires changing basis rather than reading the existing one.

## From superposition to dictionary learning

This frames the central practical problem. If the meaningful units are directions, smeared
across neurons and overlapping under superposition, how do we recover a clean, monosemantic
set of features from the entangled activations? Stated this way it is a **dictionary
learning** problem: find an overcomplete set of directions such that each activation is a
sparse combination of them. That is exactly the job of **sparse autoencoders**, the subject
of the [next note]({{ '/research/sparse-autoencoders/' | relative_url }}).

The same linear picture also underwrites applied safety work. In our
[safe-unsafe separation]({{ '/#publications' | relative_url }}) result, a single direction
in activation space is enough to flag unsafe inputs with a linear readout, with no weight
modification. The hypothesis developed here is the foundation such methods stand on.

## Summary

Language models do not represent concepts in neurons; they represent them as **directions** in
activation space (the linear representation hypothesis). Because the space has **no
privileged basis**, the neuron axes are an arbitrary frame and meaning lives in the relative
geometry of directions. To represent more features than dimensions, the model places them in
**superposition**, exploiting near-orthogonality and the sparsity of natural data, which is
what makes individual neurons **polysemantic**. Interpretability is therefore not the act of
reading neurons but of recovering the right directions, which is precisely what dictionary
learning and sparse autoencoders set out to do.

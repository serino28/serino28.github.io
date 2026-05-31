---
title: "Why You Can't Read a Model by Staring at Neurons"
description: "An accessible tour of the linear representation hypothesis, superposition, and polysemanticity: why concepts live as directions, not neurons."
date: 2024-10-15
tags: [Interpretability, Foundations]
lang: en
alt_url: /it/research/linear-representations-superposition/
---

Suppose you could freeze a language model mid-thought and inspect it, neuron by
neuron, like reading dials on a control panel. You point at one and ask: *what does
this measure?* The intuitive hope is that each neuron has a job: this one detects
French, that one tracks sarcasm, another lights up for code.

It would be wonderful. It's also mostly wrong. This note is about *why*, and about
the three ideas you need to make sense of how models actually store what they know:
the **linear representation hypothesis**, **superposition**, and **polysemanticity**.

## Concepts are directions, not dials

Start with a cleaner idea than "one neuron, one concept." Picture the model's internal
state at some layer as an **arrow** floating in a very high-dimensional space, with
thousands of dimensions instead of the three we can imagine. Every time the model
processes some text, that arrow points somewhere specific.

The **linear representation hypothesis** says that meaningful concepts correspond to
particular *directions* in that space. "This text is in French" is one direction.
"This sentence is about money" is another. To ask whether the model currently represents
something, you don't read a single neuron; you check **how much the arrow leans along
that concept's direction**.

<figure>
  <img src="{{ '/assets/img/posts/linearity-word2vec.png' | relative_url }}"
       alt="Hand-drawn vector diagram with the words king, queen, man and woman, arranged so that the move from man to king matches the move from woman to queen.">
  <figcaption>The classic word2vec analogy: <em>king − man + woman ≈ queen</em>. Semantic relationships show up as straight-line moves through the space, the first clue that meaning is stored <em>linearly</em>. (Mikolov et&nbsp;al., 2013; Park et&nbsp;al., 2024.)</figcaption>
</figure>

> Think of a music chord. The sound you hear is one thing, a single waveform, but
> it's made of several notes played together. A trained ear can pick out each note.
> The model's internal state is the chord; concepts are the notes; interpretability is
> learning to hear them one at a time.

<figure>
  <img src="{{ '/assets/img/posts/feature-as-direction.png' | relative_url }}"
       alt="Hand-drawn 3D axes labelled neuron 1, 2 and 3, with a red 'concept direction' arrow that blends all three axes instead of lining up with any one of them.">
  <figcaption>A feature isn't a neuron. It's a single <em>direction</em>, a unit vector built from many neurons at once, pointing off at its own angle through the activation space. (A Mathematical Framework for Transformer Circuits, Anthropic.)</figcaption>
</figure>

Why does this matter so much? Because if concepts are directions, they're *findable*.
You can measure them, monitor them, even nudge them, all with simple linear tools
instead of wrestling with the whole tangled network. A surprising amount of modern
interpretability rides on this one assumption holding up.

## Spin the axes, and the neurons lie

Here's a thought experiment that makes the point sharp. Take the whole cloud of
activation vectors and **rotate the coordinate system**: leave the arrows exactly
where they are, and just turn the axes you measure them against. Every single *neuron
value* changes. But the **angles between the arrows, and their dot products, don't move
at all**.

<figure>
  <img src="{{ '/assets/img/posts/basis-rotation.png' | relative_url }}"
       alt="Two side-by-side hand-drawn diagrams of the same vectors under different axis orientations; the angle theta between the activation and the concept direction is identical in both.">
  <figcaption>Rotate the axes (right) and every neuron reading changes completely, yet the angle θ between the activation and the concept direction, the part that actually carries meaning, stays exactly the same.</figcaption>
</figure>

So if you'd pinned an interpretation onto "neuron 37 fires for X," a harmless rotation
would have erased it, even though the model computes the very same thing. In a space
with **no privileged basis**, the axes are just an arbitrary ruler. Meaning lives in
the *relative geometry* of the directions, not in any single coordinate.

That's the clean version. The honest version has a twist worth knowing: **not every
space inside the model is free to rotate.**

- The **residual stream**, the shared workspace concepts get written to, really has
  no privileged basis. You can rotate it and fold the rotation into the surrounding
  weight matrices without changing the network's behaviour, so reading one of its
  dimensions in isolation is genuinely meaningless.
- The **MLP's hidden units** are different. Their nonlinearity (ReLU/GELU) acts on each
  coordinate *separately*, which bolts the axes down: rotate that space and you change
  the function the layer computes. There, the neuron axes are real.

And that second case is where it gets interesting. Even where neurons *are* privileged,
real objects, the concepts still refuse to line up with them. The axes are nailed in
place and the features point off at their own stubborn angles anyway. That stubbornness
has a name, and it's the next piece of the puzzle.

## The puzzle: too many ideas, not enough room

Here's the tension. A model needs to represent an enormous number of concepts, far
more than it has neurons. A mid-size layer might have a few thousand dimensions, but
the model clearly tracks *way* more than a few thousand distinguishable things about
its input.

How do you fit ten thousand concepts into a thousand-dimensional space?

You cheat, cleverly. This is **superposition**: the model packs many more concept
directions into the space than there are dimensions, by letting them *overlap* a
little. It works because of a quiet fact about language: at any given moment, **almost
all concepts are absent**. A sentence about a French recipe isn't also about quantum
physics, basketball stats, and legal contracts all at once. Since only a handful of
concepts are "on" at a time, their directions can share space without stepping on each
other too often.

> Imagine a small apartment shared by a hundred roommates who are almost never home at
> the same time. With enough luck and scheduling, a hundred people can live in a space
> built for ten, *as long as they don't all show up at once.* Superposition is the
> model doing exactly this with concepts.

It's a genuinely good deal for the model: more representational capacity for free. But
it's a nightmare for anyone trying to interpret it.

## The symptom: polysemantic neurons

Superposition has a visible consequence, and it's the thing that wrecks the
"one neuron, one concept" dream: **polysemanticity**.

Because concept directions don't line up neatly with individual neurons, any single
neuron ends up participating in *many* unrelated concepts at once. Inspect it and
you'll find it firing for, say, academic citations *and* the color green *and* a
particular grammatical quirk, a meaningless-looking jumble. The neuron isn't broken.
It's just that the model never agreed to organize itself one-concept-per-neuron in the
first place. The real structure lives in *combinations* of neurons, in directions that
cut across them.

This is why staring at neurons rarely tells you anything. You're trying to read a chord
by examining a single string.

## So what do we do about it?

If the meaningful units are directions, and those directions are smeared across neurons
and overlapping with each other, the central practical question becomes:

**How do we recover the original, clean concepts from the superposed mess?**

That's exactly the job of **sparse autoencoders (SAEs)**, the subject of the
[next note]({{ '/research/sparse-autoencoders/' | relative_url }}). The short version: we
train a second, small network whose only purpose is to "unmix" the activations into a long list
of features that are mostly off at any moment, mirroring the sparsity that made
superposition possible in the first place.

It's also why the linear picture is more than a tidy story. In our work on
[safe-unsafe separation]({{ '/#publications' | relative_url }}), the whole method leans
on it: if "unsafe request" is a direction, then a simple readout along that direction
can flag unsafe inputs, with no retraining and no surgery on the weights. The hypothesis
in this note is the foundation that result stands on.

## The one-paragraph version

Models don't store concepts in neurons; they store them as **directions** in a
high-dimensional space (the linear representation hypothesis). To represent more
concepts than they have dimensions, they let those directions **overlap**, leaning on
the fact that few concepts are active at once (superposition). The side effect is that
individual neurons look like nonsense, each tangled up in many unrelated concepts
(polysemanticity). Interpretability, then, isn't about reading neurons; it's about
finding the right directions.

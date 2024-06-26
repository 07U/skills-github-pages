<script src="load-mathjax.js" async></script>

layout: page
title: "I. Preamble"
description: "I. Preamble"
permalink: https://07u.github.io/skills-github-pages/Preamble

# 1. Introduction
<div style="display:none">\(\setSection{1}\)</div>

This set of articles was written to serve several purposes. The first is my urge to write. There is a nice feeling in sharing knowledge with others, initiating a discussion, or just revisiting nice ideas. I had this urge to write, especially on a topic very close to my heart, for a few years now - even before I started to work in the video games industry - and finally I took the time to fulfill it. I am very pleased, because it allowed me to better understand things I thought I understand, but apparently I only partially knew. I recommend you to do the same with a simple topic - you will be surprised!

Speaking about the video games industry, the second purpose for writing the following set of articles is to allow video game programmers to better understand the concept of quaternions. Be it new developers who do not have years of experience with this mathematical structure, and look for an explanation to why they ``work''; or be it experienced engineers that use it as a black box, because someone already wrote the math library in the previous century, and anyway the code is unreadable.

A lot of people try to understand (and explain) quaternions in \\(4D\\). As an excellent former lecturer of mine describes it - our brain was designed to make us run from lions in the Savanna, and not for comprehending the \\(4^{\text{th}}\\) dimension. I would like to show that although quaternions are \\(4\\)-dimensional objects, we do not need the \\(4^{\text{th}}\\) dimension in order to fully understand how they rotate \\(3D\\) spaces.

Okay, but why is it on LinkedIn? Well, I wanted to ``publish'' it somewhere, and the concepts that are going to be reviewed are well known in the scientific community. However, in a practical industry like the video games one, some of the concepts covered here may not be familiar to some. I would also like to allow for a potential discussion about the text, and a social media as LinkedIn looks like a good platform to have one with other professionals. Lastly, I hope that the algorithm I present at the end of this series could be helpful, even if just on the conceptual level, for other developers.

# 2. Prerequisites And Goals
<div style="display:none">\(\setSection{2}\)</div>

This text does not serve as an introduction to [Linear Algebra](https://en.wikipedia.org/wiki/Linear_algebra), [Complex Numbers](https://en.wikipedia.org/wiki/Complex_number), [Group Theory](https://en.wikipedia.org/wiki/Group_theory), [Representation Theory](https://en.wikipedia.org/wiki/Representation_theory), or even [Quaternions](https://en.wikipedia.org/wiki/Quaternion). The assumption is that the reader is familiar at least with linear algebra and complex numbers, and could understand new ideas as they are presented or used. Explicit derivations are not shown, and in order to arrive to the end result, one needs to know the theory behind the [Taylor series](https://en.wikipedia.org/wiki/Taylor_series), especially the [expansion of the exponential function](https://en.wikipedia.org/wiki/Exponential_function#Formal_definition), as well as the properties of the basic [trigonometric functions](https://en.wikipedia.org/wiki/Trigonometric_functions). There is an attempt referring to external sources, mostly Wikipedia (as is done in this paragraph), for further reading in case one of the terms is not known to the reader.

The text is also not going to cover the more general subject of [Geometric Algebra](https://en.wikipedia.org/wiki/Geometric_algebra). If one wants to gain a complete picture on the algebraic representation of geometric objects, how to transform them (in any number of dimensions!), and how this can be implemented in a video game engine - this is not the place. There are good sources for material on this huge subject online. One which I really recommend is [biVector.net](https://bivector.net/) - I found the documents a little bit harder to understand for beginners, but the videos are highly recommended![^1]

This was about what the text expects of you, and what you should not expect of it. The main goal of this text is to place the quaternions inside a fictional MRI machine, and see into their mechanism for rotations. As a reminder, with this mechanism, a vector \\(\vec{v} = \left(x, y, z\right)\\) is rotated by defining the purely imaginary quaternion
\begin{equation}
	\label{eq:Quaternion Vector}
	p = x i + y j + z k\\,,
\end{equation}
and applying the sandwich product
\begin{equation}
	\label{eq:Quaternion Transformation}
	p \longmapsto q p q^{-1}\\,,
\end{equation}
with some quaternion \\(q\\). Don't worry, we will go over the definition of quaternion multiplications again. I would like to state at this stage, though, that because, by definition,
\begin{equation}
	\label{eq:Quaternion Inverse}
	q q^{-1} = 1\\,,
\end{equation}
the global scale does not play any role. It is thus customary and makes total sense to consider only unit-quaternions, *i.e.* those that satisfy
\begin{equation}
	\label{eq:Unit Quaternion Inverse}
	\left|q\right|^{2} = q q^{\*} = 1 \quad\longleftrightarrow\quad q^{-1} = q^{\*}\\,,
\end{equation}
with the conjugation operation negating \\(i\\), \\(j\\), and \\(k\\). Hence, the main goal for us would be to observe the matrix-code that runs\footnote{Pun was not intended.}
\begin{equation}
	\label{eq:Unit Quaternion Transformation}
	p \longmapsto q p q^{\*}\\,.
\end{equation}

---

[^1]: Please do it after you read this text, as it makes it obsolete in some sense haha

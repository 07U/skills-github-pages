<script src="load-mathjax.js" async></script>

# 1. Introduction
<div style="display:none">\(\setSection{1}\)</div>

<p align="justify">This set of articles was written to serve several purposes. The first is my urge to write. There is a nice feeling in sharing knowledge with others, initiating a discussion, or just revisiting nice ideas. I had this urge to write, especially on a topic very close to my heart, for a few years now - even before I started to work in the video games industry - and finally I took the time to fulfill it. I am very pleased, because it allowed me to better understand things I thought I understand, but apparently I only partially knew. I recommend you to do the same with a simple topic - you will be surprised!</p>

<p align="justify">\(\phantom{\quad}\)Speaking about the video games industry, the second purpose for writing the following set of articles is to allow video game programmers to better understand the concept of quaternions. Be it new developers who do not have years of experience with this mathematical structure, and look for an explanation to why they &ldquo;work&rdquo;; or be it experienced engineers that use it as a black box, because someone already wrote the math library in the previous century, and anyway the code is unreadable.</p>

<p align="justify">\(\phantom{\quad}\)A lot of people try to understand (and explain) quaternions in \(4D\). As an excellent former lecturer of mine describes it - our brain was designed to make us run from lions in the Savanna, and not for comprehending the \(4^{\text{th}}\) dimension. I would like to show that although quaternions are \(4\)-dimensional objects, we do not need the \(4^{\text{th}}\) dimension in order to fully understand how they rotate \(3D\) spaces.</p>

<p align="justify">\(\phantom{\quad}\)Okay, but why is it on LinkedIn? Well, I wanted to &ldquo;publish&rdquo; it somewhere, and the concepts that are going to be reviewed are well known in the scientific community. However, in a practical industry like the video games one, some of the concepts covered here may not be familiar to some. I would also like to allow for a potential discussion about the text, and a social media as LinkedIn looks like a good platform to have one with other professionals. Lastly, I hope that the algorithm I present at the end of this series could be helpful, even if just on the conceptual level, for other developers.</p>

# 2. Prerequisites And Goals
<div style="display:none">\(\setSection{2}\)</div>

<p align="justify">This text does not serve as an introduction to [Linear Algebra](https://en.wikipedia.org/wiki/Linear_algebra), [Complex Numbers](https://en.wikipedia.org/wiki/Complex_number), [Group Theory](https://en.wikipedia.org/wiki/Group_theory), [Representation Theory](https://en.wikipedia.org/wiki/Representation_theory), or even [Quaternions](https://en.wikipedia.org/wiki/Quaternion). The assumption is that the reader is familiar at least with linear algebra and complex numbers, and could understand new ideas as they are presented or used. Explicit derivations are not shown, and in order to arrive to the end result, one needs to know the theory behind the [Taylor series](https://en.wikipedia.org/wiki/Taylor_series), especially the [expansion of the exponential function](https://en.wikipedia.org/wiki/Exponential_function#Formal_definition), as well as the properties of the basic [trigonometric functions](https://en.wikipedia.org/wiki/Trigonometric_functions). There is an attempt referring to external sources, mostly Wikipedia (as is done in this paragraph), for further reading in case one of the terms is not known to the reader.</p>

<p align="justify">\\(\phantom{\quad}\\)The text is also not going to cover the more general subject of [Geometric Algebra](https://en.wikipedia.org/wiki/Geometric_algebra). If one wants to gain a complete picture on the algebraic representation of geometric objects, how to transform them (in any number of dimensions!), and how this can be implemented in a video game engine - this is not the place. There are good sources for material on this huge subject online. One which I really recommend is [biVector.net](https://bivector.net/) - I found the documents a little bit harder to understand for beginners, but the videos are highly recommended![^1]</p>

<p align="justify">\\(\phantom{\quad}\\)This was about what the text expects of you, and what you should not expect of it. The main goal of this text is to place the quaternions inside a fictional MRI machine, and see into their mechanism for rotations. As a reminder, with this mechanism, a vector \\(\\vec{v} = \\left(x, y, z\\right)\\) is rotated by defining the purely imaginary quaternion
\\begin{equation}
	\\label{eq:Quaternion Vector}
	p = x i + y j + z k\\,,
\\end{equation}
and applying the sandwich product
\\begin{equation}
	\\label{eq:Quaternion Transformation}
	p \\longmapsto q p q^{-1}\\,,
\\end{equation}
with some quaternion \\(q\\). Don't worry, we will go over the definition of quaternion multiplications again. I would like to state at this stage, though, that because, by definition,
\\begin{equation}
	\\label{eq:Quaternion Inverse}
	q q^{-1} = 1\\,,
\\end{equation}
the global scale does not play any role. It is thus customary and makes total sense to consider only unit-quaternions, *i.e.* those that satisfy
\\begin{equation}
	\\label{eq:Unit Quaternion Inverse}
	\\left|q\\right|^{2} = q q^{\\ast} = 1 \\quad\\longleftrightarrow\\quad q^{-1} = q^{\\ast}\\,,
\\end{equation}
with the conjugation operation negating \\(i\\), \\(j\\), and \\(k\\). Hence, the main goal for us would be to observe the matrix-code that runs[^2]
\\begin{equation}
	\\label{eq:Unit Quaternion Transformation}
	p \\longmapsto q p q^{\\ast}\\,.
\\end{equation}</p>

<p align="justify">\\(\phantom{\quad}\\)By considering unit-quaternions, we have eliminated one dimension from their description. However, it is a dimension in the wrong direction. I would like to show you the &ldquo;natural&rdquo; \\(3\\) dimensions of unit-quaternions. This would allow us to clarify how and why quaternions rotate \\(3\\)-dimensional vectors, and how and why they relate to \\(3 \\times 3\\) rotation matrices the way they do.</p>

<p align="justify">\\(\phantom{\quad}\\)At the end of this article set, I hope you would also be able to: understand the potential issues in quaternion linear interpolation (without even performing one!); be able to criticize any text/video on this subject (even this one!); and if you are going to really pay attention, understand what determines the direction of rotation (which seems to always be done according to the right-hand rule[^3]). This last point is extremely subtle, and I know I did not quite understand the technicalities until now.</p>

<p align="justify">\\(\phantom{\quad}\\)As stated before, nothing here is new. I do hope that it will provide a refreshing point of view to some readers, and help others. The derivations are also not rigorous, as I hope the small details skipped are easily reproducible by the reader, and because I wanted to release the text at some point. With that said, this is the internet - if something is missing, or some jump is too big, please write to me and I will make sure to improve and clarify the text. The amount of rigor is kept to some low threshold also because LinkedIn does not support mathematical expressions, and the creation and maintenance of any such expression involves some more work on my side.</p>

# 3. Overview
<div style="display:none">\(\setSection{3}\)</div>

<p align="justify">Part&nbsp;\\ref{part:Intuition} serves as an appetizer for what is yet to come, and builds new concepts on top of previous knowledge. In Sec.&nbsp;\\ref{sec:Rotations With Complex Numbers} we review complex numbers and their relation to \\(2D\\) rotations. We then make a small leap, in Sec.&nbsp;\\ref{sec:A Glimpse Into The Future}, and use the complex numbers example to define an extremely important concept - the *representation* - which would allow us to look at quaternions with new and powerful glasses.</p>

<p align="justify">\\(\phantom{\quad}\\)Part&nbsp;\\ref{part:Establishing Basic Concepts} starts in Sec.&nbsp;\\ref{sec:Groups}, where we introduce the *group*. In Sec.&nbsp;\\ref{sec:Fun With Quaternions}, we repeat the process which was applied to complex numbers, but now with quaternions. Unfortunately, it is not as easy as with complex numbers, as it does not directly connects quaternions to rotations, but to some weird transformation in \\(4\\) dimensions. However, it reveals an interesting and somewhat hidden role of the imaginary part of quaternions. Closing remarks are made in Sec.&nbsp;\\ref{sec:Closing Remarks}.</p>

<p align="justify">\\(\phantom{\quad}\\)Part&nbsp;\\ref{part:The Connection To 3D Rotations} goes almost till the end, where we establish the first connection between quaternions and rotations in \\(3\\)-dimensional space. It is the most technical part, and it starts with a bang. Sec.&nbsp;\\ref{sec:Representations} dives into more details about *representations*. Sec.&nbsp;\\ref{sec:The SU(2) Algebra And Generators} clarifies this above-mentioned hidden role of imaginary quaternions, where we briefly mention the concepts of an *algebra* and *generators*. In Sec.&nbsp;\\ref{sec:The Connection Between SU(2) And SO(3)} we finally derive an implicit connection between quaternions and \\(3D\\) rotations. Sec.&nbsp;\\ref{sec:Summary} summarizes.</p>

<p align="justify">\\(\phantom{\quad}\\)But we are not done yet! Part&nbsp;\\ref{part:On The Adjoint Representation} serves as the ultimate part. Sec.&nbsp;\\ref{sec:Deriving The Explicit Rotation Matrix Form} applies all the knowledge we have gained, showing explicitly how a \\(3\\)-dimensional rotation matrix emerges out of a quaternion. Sec.&nbsp;\\ref{sec:A Branchless Matrix-To-Quaternion Translation} discusses the inverse process of extracting a quaternion out of a rotation matrix, and presents a branchless implementation for doing this.</p>

# 4. Acknowledgments
<div style="display:none">\(\setSection{4}\)</div>

<p align="justify">I would like to thank [profile](https://www.linkedin.com/).</p>

---

<p align="justify">[^1]: Please do it after you read this text, as it makes it obsolete in some sense haha</p>
<p align="justify">[^2]: Pun was not intended.</p>
<p align="justify">[^3]: There are claims on the internet that a quaternion with a negative real part performs a rotation according to the left-hand rule, but that is not quite accurate.</p>

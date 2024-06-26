<script src="load-mathjax.js" async></script> 

Before we dive into analyzing quaternions in Part&nbsp;\\ref{part:Establishing Basic Concepts}, we review in Sec.&nbsp;\\ref{sec:Rotations With Complex Numbers} what is already known to us about complex numbers, and their relation to rotations. In Sec.&nbsp;\\ref{sec:A Glimpse Into The Future} we are going to familiarize ourselves with some advanced topics, which will be covered in more details in Part&nbsp;\\ref{part:The Connection To 3D Rotations}.

This part is going to serves as a comparison point. All of the results and definitions presented later in the text, in the context of quaternions, can be applied also to the complex numbers, with more ease. Hence, I encourage you to always come back here and try to understand the definitions in the context of complex numbers, even when not instructed to do so in the text.

Let us start.

# 5. Rotations With Complex Numbers
<div style="display:none">\(\setSection{5}\)</div>

[Euler](https://en.wikipedia.org/wiki/Leonhard_Euler) already posted his famous [Euler's Formula](https://en.wikipedia.org/wiki/Euler%27s_formula) on LinkedIn,
\\begin{equation}
	\\label{eq:Euler's Formula}
	e^{i \\theta} = \\cos\\!\\left(\\theta\\right) + i \\sin\\!\\left(\\theta\\right)\\,.
\\end{equation}
It represents a rotation in the \\(2\\)-dimensional complex plane. This is a rotation by \\(\\theta\\) radians, sending \\(1\\) to \\(\\cos\\!\\left(\\theta\\right) + i \\sin\\!\\left(\\theta\\right)\\) and \\(i\\) to \\(-\\sin\\!\\left(\\theta\\right) + i \\cos\\!\\left(\\theta\\right)\\). How does it relate to column-vector spaces? Defining
\\begin{equation}
	\\label{eq:2D Basis}
	\\vec{1} \\equiv \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}\\,,\\quad \\vec{i} \\equiv \\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix}\\,,
\\end{equation}
the matrix form of the rotation above is
\\begin{equation}
	\\label{eq:2D Rotation Matrix}
	e^{i \\theta} \\ \\sim\\  \\rho\\!\\left(\\theta\\right) \\equiv \\begin{pmatrix} \\cos\\!\\left(\\theta\\right) & -\\sin\\!\\left(\\theta\\right) \\\\ \\sin\\!\\left(\\theta\\right) & \\cos\\!\\left(\\theta\\right) \\end{pmatrix}\\,.
\\end{equation}
The similarity symbol, \\(\\sim\\), is used to show that we speak about the same element, but in different points of view. Above, the left hand side is the complex plane point of view, and the right hand side is the \\(2\\)-dimensional Euclidean vector space. They are equivalent. \\(\\rho\\!\\left(\\theta\\right)\\) is a generic form of an element in a set we call \\(SO\\!\\left(2\\right)\\). \\(SO\\!\\left(2\\right)\\) is more than just a set - it is a *group*. Groups are reviewed in more details in Sec.&nbsp;\\ref{sec:Groups} of Part&nbsp;\\ref{part:Establishing Basic Concepts}. Right now, for the sake of completeness, we define the \\(SO\\!\\left(2\\right)\\) group
\\begin{equation}
	\\label{eq:SO(2) Definition}
	SO\\!\\left(2\\right) = \\Set{\\!O = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} | a,b,c,d \\in \\mathbb{R}\\,,\\ O^{T} O = 𝟙\\,,\\ \\det\\!\\left[O\\right] = 1\\!}\\,,
\\end{equation}
where \\(O^{T}\\) is the transpose of \\(O\\), and \\(𝟙\\) is the \\(2 \\times 2\\) unit matrix. Above, we were just describing the correspondence
\\begin{equation}
	\\label{eq:Correspondence}
	e^{i \\theta} \\left(a + i b\\right) \\ \\sim\\  \\rho\\!\\left(\\theta\\right) \\left(a \\vec{1} + b \\vec{i}\\right)\\,.
\\end{equation}

This simple example allows us to build some tools for the future. We first expand the correspondence above, Eq.&nbsp;\\eqref{eq:Correspondence}, using Euler's formula, Eq.&nbsp;\\eqref{eq:Euler's Formula}, and the \\(2\\)-dimensional rotation matrix, Eq.&nbsp;\\eqref{eq:2D Rotation Matrix},
\\begin{equation}
	\\label{eq:Correspondence Expanded}
	\\left(\\cos\\!\\left(\\theta\\right) \\hat{1} + \\sin\\!\\left(\\theta\\right) \\hat{i}\\right) \\left(a 1 + b i\\right) \\ \\sim\\  \\begin{pmatrix} \\cos\\!\\left(\\theta\\right) & -\\sin\\!\\left(\\theta\\right) \\\\ \\sin\\!\\left(\\theta\\right) & \\cos\\!\\left(\\theta\\right) \\end{pmatrix} \\left(a \\vec{1} + b \\vec{i}\\right)\\,.
\\end{equation}
There are several "different" spaces here to consider (spanned by and related to the multiplicative identity, \\(1\\), and the imaginary number, \\(i\\)):
* The left term of the left hand side, the "hat" space, is the complex depiction of a rotation transformation.
* The right term of the left hand side, the "scalars" space, is the complex plane, \\(\\mathbb{C}^{1}\\).
* The left term of the right hand side, the "matrix" space, is the \\(2 \\times 2\\) matrix depiction of a rotation transformation.
* The right term of the right hand side, the "vectors" space, is the regular \\(2D\\) Euclidean space, \\(\\mathbb{R}^{2}\\), defined in Eq.&nbsp;\\eqref{eq:2D Basis}.
<br><br><br>

Eq.&nbsp;\\eqref{eq:2D Basis} defines the relation between the complex plane and the \\(2\\)-dimensional Euclidean space. What is the relation between the "hat" space and the \\(2 \\times 2\\) matrices one? It is given by
\\begin{equation}
	\\label{eq:SO(2) Basis}
	\\hat{1} \\ \\sim\\  𝟙 \\equiv \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}\\,,\\quad \\hat{i} \\ \\sim\\  -\\epsilon \\equiv -\\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}\\,,
\\end{equation}
with \\(\\epsilon\\) the generic symbol for the [Levi-Civita tensor](https://en.wikipedia.org/wiki/Levi-Civita_symbol#Two_dimensions). It is easy to see that \\(\\left(-\\epsilon\\right)^{2} = -𝟙\\), in the same way as \\(i^{2} = -1\\). It is thus tempting, and actually useful, to take the exponent of \\(-\\epsilon\\),[^4] to get the \\(2 \\times 2\\) form of Euler's formula, Eq.&nbsp;\\eqref{eq:Euler's Formula},
\\begin{equation}
	\\label{eq:2x2 Euler Formula}
	e^{-\\epsilon \\theta} = \\cos\\!\\left(\\theta\\right) 𝟙 + \\sin\\!\\left(\\theta\\right) \\left(-\\epsilon\\right) \\equiv \\rho\\!\\left(\\theta\\right)\\,.
\\end{equation}

# 6. A Glimpse Into The Future
<div style="display:none">\(\setSection{6}\)</div>

\\(\\left(-\\epsilon\\right)^{2} = -𝟙\\) acts as a great example to introduce some definitions and common terms. This similarity to \\(i^{2} = -1\\) is an important property, which is a part of the definition of...

A *representation*, \\(D\\), is a linear map from one set of elements to another set of matrices, which has to preserve some operation.[^5] In all of our examples, the operations would be multiplication of either scalars or matrices, and the linearity would be in relation to multiplication by a real scalar. Mathematically, the definition is as follows: let \\(\\alpha\\) be a real scalar, and \\(a\\) and \\(b\\) be complex numbers, quaternions, or matrices. A representation \\(D\\) must satisfy
\\begin{align}
	\\label{eq:Representation Linearity} D\\!\\left(\\alpha \\cdot a\\right) & = \\alpha D\\!\\left(a\\right)\\,,\\\\ \\label{eq:Representation Homomorphism} D\\!\\left(a \\cdot b\\right) & = D\\!\\left(a\\right) \\cdot D\\!\\left(b\\right)\\,.
\\end{align}

In our complex numbers example, what was presented as a "similarity" in Eq.&nbsp;\\eqref{eq:SO(2) Basis}, is actually a representation. It even has a special name - it is the *Fundamental* representation of \\(SO\\!\\left(2\\right)\\)
\\begin{equation}
	\\label{eq:i Fundamental Representation}
	D\\!\\left(1\\right) = 𝟙 \\equiv \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}\\,,\\quad D\\!\\left(i\\right) = -\\epsilon \\equiv \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}\\,.
\\end{equation}
It is no surprise then that \\(\\left(-\\epsilon\\right)^{2} = -𝟙\\) just like \\(i^{2} = -1\\) - the representation is the mapping that allows us to discuss similar structures with different elements.

The \\(2 \\times 2\\) form of Euler's formula, Eq.&nbsp;\\eqref{eq:2x2 Euler Formula}, can now be rewritten as
\\begin{equation}
	\\label{eq:Fundamental Representation of Euler's Formula}
	e^{D\\!\\left(i \\theta\\right)} = e^{D\\!\\left(i\\right) \\theta} = \\cos\\!\\left(\\theta\\right) D\\!\\left(1\\right) + \\sin\\!\\left(\\theta\\right) D\\!\\left(i\\right)\\,.
\\end{equation}
Notice that the linearity, Eq.&nbsp;\\eqref{eq:Representation Linearity}, and the multiplication-preservation property, Eq.&nbsp;\\eqref{eq:Representation Homomorphism}, allow us to just insert \\(D\\) in the original Euler's formula, Eq.&nbsp;\\eqref{eq:Euler's Formula}, and get Eq.&nbsp;\\eqref{eq:Fundamental Representation of Euler's Formula}.

Usually, the concept of representations is presented later on. This intuition part, though, is a great setting to introduce what is one of the toughest concepts to understand. We end this part with a question: which one of the following maps is a representation (if any)?
\\begin{gather}
	D_{1}\\!\\left(1\\right) = D_{1}\\!\\left(i\\right) = 𝟙\\,,\\\\	D_{2}\\!\\left(1\\right) = 𝟙\\,,\\ D_{2}\\!\\left(i\\right) = \\epsilon\\,,\\\\ D_{3}\\!\\left(1\\right) = -\\epsilon\\,,\\ D_{3}\\!\\left(i\\right) = 𝟙\\,,\\\\ D_{4}\\!\\left(1\\right) = \\begin{pmatrix} 1 & 0 & 0 & 0 \\\\ 0 & 1 & 0 & 0 \\\\ 0 & 0 & 1 & 0 \\\\ 0 & 0 & 0 & 1 \\end{pmatrix}\\,,\\ D_{4}\\!\\left(i\\right) = \\begin{pmatrix} 0 & 0 & 0 & -1 \\\\ 0 & 0 & -1 & 0 \\\\ 0 & 1 & 0 & 0 \\\\ 1 & 0 & 0 & 0 \\end{pmatrix}\\,.
\\end{gather}

---

[^4]: It is assumed that the reader is familiar with these kind of operations.
[^5]: A comment for the experts: this is the first concept that gets presented, so there is an attempt to stay in the "intuition stage". Hence, no buzz words are used, and the discussion is kept at an extremely high level.

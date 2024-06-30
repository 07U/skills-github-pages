<script src="load-mathjax.js" async></script>

## \\(\\text{III}\\ \\) Establishing Basic Concepts

In Part&nbsp;[\\(\\text{II}\\)](https://07U.github.io/skills-github-pages/Intuition), we reviewed the intuitive connection between complex numbers (specifically the imaginary number, \\(i\\)) and \\(2D\\) rotations in linear algebra.

&nbsp;&nbsp;&nbsp;&nbsp;In Section&nbsp;[\\(7\\)](https://07U.github.io/skills-github-pages/EstablishingBasicConcepts#7--groups), the mathematical structure of *groups* is going to be discussed. We also start analyzing quaternions, and derive an analogous result to Euler's formula in Section&nbsp;[\\(8\\)](https://07U.github.io/skills-github-pages/EstablishingBasicConcepts#8--fun-with-quaternions).
<br><br>

### \\(7\\ \\) Groups
<div style="display:none">\(\setSection{7}\)</div>

Groups are extremely intuitive to understand, and are relatively simple mathematical structures. Here is the definition: a [*group*](https://en.wikipedia.org/wiki/Group_(mathematics)) is a pair of a set \\(G\\) and an operation \\(\\cdot\\),[^6] with the following properties:
1. Closure - for any two elements \\(g\_{1}, g\_{2} \\in G\\):
	\\begin{equation}
		g\_{1} \\cdot g\_{2} \\in G\\,.
	\\end{equation}
2. Associativity - for any three elements \\(g\_{1}, g\_{2}, g\_{3} \\in G\\):
	\\begin{equation}
		\\left(g\_{1} \\cdot g\_{2}\\right) \\cdot  g\_{3} = g\_{1} \\cdot \\left(g\_{2} \\cdot g\_{3}\\right)\\,.
	\\end{equation}
3. Identity - \\(G\\) contains an element \\(e\\), such that for all \\(g \\in G\\):
	\\begin{equation}
		e \\cdot  g = g \\cdot e = g\\,.
	\\end{equation}
4. Inverse - for any element \\(g \\in G\\), exists an element \\(g^{-1} \\in G\\), such that:
	\\begin{equation}
		g \\cdot  g^{-1} = g^{-1} \\cdot g = e\\,.
	\\end{equation}

If you choose not to master Group Theory, and just want to jump into the juicy stuff, worry not! It is not a coincidence groups are being mentioned here - any time you want to think about the properties of groups, just think about rotations. Whether in \\(2D\\) or in \\(3D\\), rotations can be combined together to form another rotation, and they all have an inverse.

&nbsp;&nbsp;&nbsp;&nbsp;Let us introduce some useful groups. The group operations in all of the groups presented below is multiplication, and we define \\(M\\!\\left(N, \\mathbb{F}\\right)\\) as the set of all \\(N \\times N\\) matrices with elements in the field \\(\\mathbb{F}\\).[^7] \\(M\\!\\left(N, \\mathbb{F}\\right)\\) is not a group, because it contains non-invertible matrices.

&nbsp;&nbsp;&nbsp;&nbsp;In Section&nbsp;[\\(5\\)](https://07U.github.io/skills-github-pages/Intuition#5--rotations-with-complex-numbers), we already encountered \\(SO\\!\\left(2\\right)\\). Let us give the general definition for any integer \\(N\\). The [Special Orthogonal](https://en.wikipedia.org/wiki/Orthogonal_group#Special_orthogonal_group) group is
\\begin{equation}
	SO\\!\\left(N\\right) = \\Set{O \\in M\\!\\left(N, \\mathbb{R}\\right) | O^{T} O = 𝟙\_{N \\times N}\\,,\\ \\det\\!\\left[O\\right] = 1}\\,.
\\end{equation}
\\(SO\\!\\left(N\\right)\\) describes rotations in the \\(N\\)-dimensional Euclidean space. The goal of this text is to establish the connection between quaternions and \\(SO\\!\\left(3\\right)\\).

&nbsp;&nbsp;&nbsp;&nbsp;Another important group, which is presented here with no clear reason, is the [Special Unitary](https://en.wikipedia.org/wiki/Special_unitary_group) group. Its definition is
\\begin{equation}
	SU\\!\\left(N\\right) = \\Set{U \\in M\\!\\left(N, \\mathbb{C}\\right) | U^{\\dagger} U = 𝟙\_{N \\times N}\\,,\\ \\det\\!\\left[U\\right] = 1}\\,.
\\end{equation}
Notice! \\(SU\\!\\left(N\\right)\\) is composed of complex \\(N \\times N\\) matrices! The \\(\\dagger\\) represents \\(T\\ast\\), meaning both taking the transpose of the matrix and the complex conjugate of its elements. What does this family of matrices represent? We do not care. Not currently, and not ever - as we are *not* interested in complex spaces. We are interested in rotations, which are applied in real spaces, with real coordinates. The complex plane is merely a tool, as the generalization of the complex numbers - the quaternions - are merely a tool. We are not interested in their operation on their respective spaces, but solely in the Euclidean space.

&nbsp;&nbsp;&nbsp;&nbsp;\\(SU\\!\\left(N\\right)\\) plays an important role in our discussion, with \\(N = 2\\). Again, it feels unnatural to consider a \\(2\\)-dimensional space with a total of \\(4\\) real degrees of freedom,[^8] so we are not going to do that. Instead, we are going to examine the group elements themselves. A matrix \\(U \\in SU\\!\\left(2\\right)\\) has the form
\\begin{equation}
	\\label{eq:SU(2) Matrix}
	U = \\begin{pmatrix} a + i b & -c + i d \\\\ c + i d & a - i b \\end{pmatrix}\\,;\\quad a, b, c, d \\in \\mathbb{R}\\,,\\ a^{2} + b^{2} + c^{2} + d^{2} = 1\\,.
\\end{equation}
There is a lot to say about this form. More specifically, we are going to encounter it in an extremely surprising place. Please keep it close to your heart, as it is the principle object that allows us to connect \\(SO\\!\\left(3\\right)\\) rotations and quaternions.

&nbsp;&nbsp;&nbsp;&nbsp;Speaking of quaternions, did you know that they compose a group themselves? The group definition serves as a place to also define (or remind the reader of) the basis of the quaternion space and multiplication rules. The *discrete* [quaternion group](https://en.wikipedia.org/wiki/Quaternion_group), of size \\(8\\) elements, is
\\begin{equation}
	\\label{eq:Quaternion Group Definition}
	Q\_{8} = \\Set{\\pm \\underline{1},\\ \\pm \\underline{i},\\ \\pm \\underline{j},\\ \\pm \\underline{k} | \\underline{i}^{2} = \\underline{j}^{2} = \\underline{k}^{2} = \\underline{i} \\underline{j} \\underline{k} = -\\underline{1}}\\,.
\\end{equation}
We use the underline mark for the sake of brevity. Later in the text, we are going to use the complex \\(i\\) next to the quaternion \\(\\underline{i}\\), so there is an attempt to prevent any potential source of confusion.
<br><br>

### \\(8\\ \\) Fun With Quaternions
<div style="display:none">\(\setSection{8}\)</div>

#### \\(8.1\\ \\) Intuition?

We take a break from advance mathematical definitions, and return to some examples. Specifically, we do whatever is done throughout mathematics (and science in general) - we apply what already worked in the intuition stage to another case.

&nbsp;&nbsp;&nbsp;&nbsp;Being a generalization of purely imaginary complex numbers, we may ask what happens when we exponentiate a purely imaginary quaternion. Nobody stops us from trying that! We first define the "Imaginary" vector
\\begin{equation}
	\\vec{I} \\equiv \\begin{pmatrix} \\underline{i} \\\\ \\underline{j} \\\\ \\underline{k} \\end{pmatrix}\\,,
\\end{equation}
and would like to generalize Euler's formula, taking
\\begin{equation}
	\\label{eq:q}
	q \\equiv e^{\\vec{I} \\cdot \\vec{\\alpha}}\\,,\\ \\vec{\\alpha} \\equiv \\alpha \\hat{n}\\,,
\\end{equation}
with \\(\\alpha\\) a real parameter, and \\(\\hat{n}\\) a real unit vector. Using \\(\\left(\\vec{I} \\cdot \\vec{\\alpha}\\right)^{2} = -\\alpha^{2}\\), one arrives to the QuaterniEuler's Formula[^9]
\\begin{equation}
	\\label{eq:QuaterniEuler's Formula}
	e^{\\vec{I} \\cdot \\vec{\\alpha}} = \\cos\\!\\left(\\alpha\\right) + \\vec{I} \\cdot \\hat{n} \\sin\\!\\left(\\alpha\\right)\\,.
\\end{equation}
Setting \\(\\hat{n}^{T} = \\begin{pmatrix} 0 & 1 & 0 \\end{pmatrix}\\),[^10] one recovers Euler's formula. Nice! But what do this formula and \\(q\\) represent?
<br><br>

#### \\(8.2\\ \\) Quaternions As Matrices

In Section&nbsp;[\\(6\\)](https://07U.github.io/skills-github-pages/Intuition#6--a-glimpse-into-the-future) of the intuition part, Part&nbsp;[\\(\\text{II}\\)](https://07U.github.io/skills-github-pages/Intuition), we defined the concept of representations. At the end of it, few maps were presented, some of which are legitimate representations. If you had your suspicions then (or have them now) that there are infinitely many representations, you are not mistaken. Without getting too deep into Representation Theory, consider the complex numbers once more. We saw that they rotate the \\(2\\)-dimensional Euclidean plane. What about a \\(3\\)-dimensional Euclidean space? We can always ignore one of the dimensions, for example the \\(z\\) direction, and choose
\\begin{equation}
	\\label{eq:SO(2) 3D Representation}
	D\\!\\left(1\\right) = 𝟙\\,,\\ D\\!\\left(i\\right) = \\begin{pmatrix} 0 & -1 & 0 \\\\ 1 & 0 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix}\\,.
\\end{equation}
Throughout the text, starting now, the size of \\(𝟙\\) is determined by the context. Evaluating the exponent using these matrices, one gets a \\(3\\)-dimensional equivalent to the \\(2\\)-dimensional rotation matrix presented in Eq.&nbsp;[\\(\\left(5.3\\right)\\)](https://07U.github.io/skills-github-pages/Intuition#mjx-eqn%3Aeq%3A2D_Rotation_Matrix). We can generalize this procedure to any number of dimensions.[^11]

&nbsp;&nbsp;&nbsp;&nbsp;Once more, we take a look at the quaternion group definition, Eq.&nbsp;\\eqref{eq:Quaternion Group Definition}, and ask: what matrices could represent these objects? Luckily, it just happens that the next line contains exactly what we look for
\\begin{equation}
	\\label{eq:2D Quaternion Representation}
	\\!\\!D\\!\\left(\\underline{1}\\right) = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}\\,,\\ D\\!\\left(\\underline{i}\\right) = \\begin{pmatrix} 0 & i \\\\ i & 0 \\end{pmatrix}\\,,\\ D\\!\\left(\\underline{j}\\right) = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}\\,,\\ D\\!\\left(\\underline{k}\\right) = \\begin{pmatrix} i & 0 \\\\ 0 & -i \\end{pmatrix}\\,.\\!\\!
\\end{equation}
\\(D\\!\\left(\\underline{1}\\right) = 𝟙\\) and \\(D\\!\\left(\\underline{j}\\right) = -\\epsilon\\), recovering the complex representation, defined in Section&nbsp;[\\(5\\)](https://07U.github.io/skills-github-pages/Intuition#5--rotations-with-complex-numbers). We could have chosen larger matrices, but why not keep it minimal? As an exercise, try to think of a strictly real representation that maps to \\(4 \\times 4\\) matrices.
<br><br>

#### \\(8.3\\ \\) What Is A Quaternion Exponentiation?

We have arrived to the final step of our exponentiation derivation - transforming the QuaterniEuler's formula, Eq.&nbsp;\\eqref{eq:QuaterniEuler's Formula}, into matrix form. We define the general direction
\\begin{equation}
	\\hat{n}  = \\begin{pmatrix} \\sin\\!\\left(\\theta\\right) \\cos\\!\\left(\\varphi\\right) \\\\ \\sin\\!\\left(\\theta\\right) \\sin\\!\\left(\\varphi\\right) \\\\ \\cos\\!\\left(\\theta\\right)\\end{pmatrix}\\,,
\\end{equation}
so the matrix form of \\(q\\), Eq.&nbsp;\\eqref{eq:q}, is
\\begin{equation}
	\\!\\!\\!\\!D\\!\\left(q\\right) \\!=\\! \\begin{pmatrix} \\cos\\!\\left(\\alpha\\right) \\!+\\! i \\sin\\!\\left(\\alpha\\right) \\cos\\!\\left(\\theta\\right) & \\sin\\!\\left(\\alpha\\right) \\sin\\!\\left(\\theta\\right) \\left(-\\!\\sin\\!\\left(\\varphi\\right) \\!+\\! i \\cos\\!\\left(\\varphi\\right)\\right) \\\\ \\sin\\!\\left(\\alpha\\right) \\sin\\!\\left(\\theta\\right) \\left(\\sin\\!\\left(\\varphi\\right) \\!+\\! i \\cos\\!\\left(\\varphi\\right)\\right) & \\cos\\!\\left(\\alpha\\right) \\!-\\! i \\sin\\!\\left(\\alpha\\right) \\cos\\!\\left(\\theta\\right) \\end{pmatrix}\\,.\\!\\!\\!\\!
\\end{equation}
Prepare to say Abracadabra, because here comes the magic. Defining
\\begin{align}
	a & = \\cos\\!\\left(\\alpha\\right)\\,, \\\\ b & = \\sin\\!\\left(\\alpha\\right) \\cos\\!\\left(\\theta\\right)\\,, \\\\ c & = \\sin\\!\\left(\\alpha\\right) \\sin\\!\\left(\\theta\\right) \\sin\\!\\left(\\varphi\\right)\\,, \\\\ d & = \\sin\\!\\left(\\alpha\\right) \\sin\\!\\left(\\theta\\right) \\cos\\!\\left(\\varphi\\right)\\,,
\\end{align}
we get a matrix that exactly matches the definition of an \\(SU\\!\\left(2\\right)\\) matrix, as is defined in Eq.&nbsp;\\eqref{eq:SU(2) Matrix}!
<br><br>

### \\(9\\ \\) Closing Remarks
<div style="display:none">\(\setSection{9}\)</div>

Please notice that quaternions, in general, are *not* \\(SU\\!\\left(2\\right)\\) transformations. It is important for me to emphasize this, because that is how we *naturally* strip one dimension away from our mathematical description. Why naturally? Our quaternion satisfies
\\begin{equation}
	\\left|q\\right|^{2} = q q^{\\ast} = \\det\\!\\left[D\\!\\left(q\\right) D\\left(q\\right)^{\\dagger}\\right] = \\det\\!\\left[D\\left(q\\right)^{\\phantom{\\dagger\\!}}\\right] \\det\\!\\left[D\\left(q\\right)^{\\dagger}\\right] = 1\\,.
\\end{equation}
As a unit-quaternion, it has \\(3\\) degrees of freedom, but they represent a \\(3\\)-dimensional hyper-sphere embedded in a \\(4D\\) space. Yikes! On the other hand, in order to derive \\(q\\), Eq.&nbsp;\\eqref{eq:q}, we have evaluated the exponent function of a \\(3\\)-dimensional vector, \\(\\vec{\\alpha}\\). Its \\(3\\) degrees of freedom represent a flat \\(3D\\) space. No curvature and no larger space are needed.

&nbsp;&nbsp;&nbsp;&nbsp;If the paragraph above is not clear, try to read it again in the context of the complex numbers example of Part&nbsp;[\\(\\text{II}\\)](https://07U.github.io/skills-github-pages/Intuition). There, the unit complex number is a \\(1\\)-dimensional sphere (normal people call it a circle) embedded in a \\(2D\\) space. On the other hand, the \\(1\\)-dimensional vector in the exponent, \\(\\theta\\), was just a straight line.

&nbsp;&nbsp;&nbsp;&nbsp;So, although the final result of the exponent expression can be written as a quaternion, and can act on quaternions, we do not need the *whole* quaternion space - and attached complications - to interpret it. In my humble opinion, this is the simpler way to think about this subject.

&nbsp;&nbsp;&nbsp;&nbsp;We interpret (the imaginary elements of) quaternions not as \\(SU\\!\\left(2\\right)\\) group *elements*, but as its *generators*. Brace yourself - we are going to dive deeper.
<br><br>

---
<br>

To the previous part: [\\(\\text{II}\\ \\) Intuition](https://07u.github.io/skills-github-pages/Intuition).<br>
To the next part: [\\(\\text{IV}\\ \\) The Connection To \\(3D\\) Rotations](https://07u.github.io/skills-github-pages/TheConnectionTo3DRotations).
<br><br>

# Comments

Discussion.
<br><br>

---
<br>

[^6]: The \\(\\cdot\\) is just a placeholder, and the operation is not necessarily multiplication (although in all of our examples, it is). There are groups where the operation is addition, and in general it could be any operation that satisfies the group properties.
[^7]: The concept of a [*field*](https://en.wikipedia.org/wiki/Field_(mathematics)) will not be cover here as well. We are going to replace the generic \\(\\mathbb{F}\\) with the real numbers, \\(\\mathbb{R}\\), or the complex numbers, \\(\\mathbb{C}\\).
[^8]: \\(\\mathbb{C}^{2}\\) is a vector space of column vectors that have two rows, where in each row resides a complex number.
[^9]: A name I just came up with. Do not use it, unless you would like people to think you are weird.
[^10]: As we will see, the quaternion \\(\\underline{j}\\) is actually "closer" to the complex \\(i\\). However, one could choose any imaginary element, as they all behave the same, and all of the expressions in this text are basis-dependent anyways.
[^11]: This also shows that \\(SO\\!\\left(2\\right)\\) is a [*subgroup*](https://en.wikipedia.org/wiki/Subgroup) of \\(SO\\!\\left(N\\right)\\), with \\(N \\geq 2\\).

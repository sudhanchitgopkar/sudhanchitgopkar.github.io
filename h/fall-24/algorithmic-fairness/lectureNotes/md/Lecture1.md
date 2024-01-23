## Lecture 1 (01/22/2024)
**Sudhan Chitgopkar, Harvard University** 
`sudhanchitgopkar[at]g.harvard.edu`

---

### Fairness Focus
- Fairness for classifiers
    - Often boolean classification 
- Fairness for scoring functions $f(x) = p \in [0, 1]$
    - Often interpreted as a probability (e.g. what is the probability that someone graduates within 4 years?)

### Representations
- Algorithms can only operate on the *representation* of the person
    - This is a reductionist process
    - Distinct individuals may be mapped to the same representation
    - Often assume few collisions between representations of people
- Representation, itself, may introduce biases
    - Unrepresentative training data
    - Training labels may be biased
    - Features used are differentially expressive
        - e.g. wealthy school district student taking 0 AP classes vs poor school district student taking 0 Ap classes
    - Unbalanced outcome proxies
    - Camera lenses optimized for white skin
    - Radio frequencies which optimize for men's voices
        - Women's voices sound shrill

### Definitions
- Calibration: 
    - Scoring function $\rightarrow [0, 1]$
    - Calibration states that if $x$ has score 0.7, then they should ideally be positive (succeed) with probability 0.7
- Group fairness
    - *Statistical parity* example: demographics of accepted students are same as in population
    - *Balance for positive class*: average score for a positive member of A equals average score for a positive member of B
    - *Within-group calibration*: per-group calibration means that discrimination can't occur towards a particular group
- Group notions fail under scrutiny
    - Very different distributions, rewards minority that "looks like" the majority
    - Surprisingly hard to test
    - Which groups should we considering? How do we deal with intersectionality?

- Individual fairness
    - People who are similar with respect to the classification task should be treated similarly
        - Formally, $\|C(x) - C(z)\| \leq d_T(x,z)$ where $C(i)$ is the distribution on outcomes for individual $i$
        - Strong legal foundation
        - *Metric Conjecture*: A metric can be extracted from any "fair" system or "fairness" oracle

- Multi-X
    - Some requirement, $x$ applies simultaneously to sets in a pre-specified collection, $C$
    - For a pre-specified set collection $C$, the predictor is accurate in expectation simultaneously on all $c \in C$
        - Average score assigned to $c$ should be equivalent to the likelihood of success for some individual in $C$
- *Regularity Lemma (informal)*
    - Fix any finite domain, $X$. Let $g: X \rightarrow [0, 1]$ be arbitrary. Given a class $F$ if functions, $g$ can be approximated by a low-complexity function $h$ that makes a small number of oracle calls to $F$
        - $| E_{x~D}[g(x)f(x)] - E_{X~D}[h(x)f(x)]| \leq \epsilon$
- Multicalibration
    - Strictly stronger than multiaccuracy
    - For a pre-specified set collection $C$, the predictor is calibrated simultaneously on all $c \in C$
### Philosophy of Probability
- What is the probability of a non-repeatable event?
- How do we evaluate an algorithm whose task we can't even define?
### Outcome Indistinguishibility
- Learning as satisfying a collection of indistinguishibility constrains
- Outcomes drawn from real life $\approx_c$ outcomes drawn from a predictive model
    - Where $c$ is a distinguisher which distinguishes an outcome from the real world versus the model
- OI Hierarchy
    - No-access-OI $(i, o_i)$
        - Multiaccuracy
    - Sample-Access-OI $(i, f_i, o_i)$
        - Draw an outcome from function $f_i$
        - Equivalent to multicalibration
    - Oracle-Access-OI: $(i, f_i, o_i)$ and oracle gates to evaluate $f_j$ for some arbitrary $j$
    - Code-Access-OI $(i, f_i, o_i)$ and arbitrary access to the code for $f$
- MC/OI Applications
    - Risk prediction in medicine
    - Fair ranking
    - Omniprediction (post-processing capability for ML that allows for training once and changing the loss function (to minimize) on the fly)
    - New results/proofs in complexity theory
    - Better worlds

### Accuracy as Fairness
- Chance of success is contexutal
    - Egalitarianism vs Misogynist, environment determines chance of success
- Who we are is contextual
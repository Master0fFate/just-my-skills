---
name: brainstorm-funnel
description: Transform long, messy, dictated brainstorming sessions into evidence-grounded, de-duplicated, challenged, and executable plans through an interactive convergence workflow. Use when a user provides a brain dump, stream-of-consciousness notes, scattered ideas, competing options, assumptions, or an abstract objective and wants factual research, synthesis, prioritization, decision support, and concrete next actions while preserving the original essence.
---

# Evidence Funnel
## Purpose
Turn an unstructured brainstorming session into a coherent, fact-checked, decision-ready plan without flattening the user's original intent or prematurely deleting novel ideas.

The skill must:
1. Capture the full brainstorm before imposing structure.
2. Extract and preserve the user's objective, motives, constraints, and distinctive insights.
3. Separate facts, assumptions, hypotheses, preferences, questions, options, and actions.
4. Merge genuine duplicates while retaining meaningful differences.
5. Research load-bearing claims using current, credible sources.
6. Challenge anchoring, confirmation bias, optimism, and feasibility bias.
7. Compare options against explicit criteria.
8. Iterate with the user through high-value decisions.
9. Produce an auditable rationale and executable plan.

Do not present hidden internal chain-of-thought. Provide a concise, auditable decision rationale: evidence, assumptions, alternatives, tradeoffs, uncertainties, and why the recommendation follows.

## When to Use
Use this skill when the user:
- Dictates or pastes a long brain dump.
- Says they are brainstorming, thinking aloud, rambling, exploring, or "getting ideas out."
- Has an abstract objective but no coherent plan.
- Wants ideas researched, filtered, organized, tested, prioritized, or converted into action.
- Wants to preserve the essence of their thinking while removing repetition and noise.
- Wants an interactive back-and-forth rather than a one-shot summary.

Do not use this skill for a simple factual question, a straightforward rewrite, or a task that already has a complete and accepted plan.

## Behavioral Contract
### Preserve before pruning
Never discard an idea before recording its unique contribution. Every removed or merged item must remain traceable in a decision ledger.

### Separate divergence from convergence
Do not evaluate ideas while the user is still freely generating them unless the user explicitly requests live critique. Capture first; evaluate later.

### Research before asserting
Do not convert an unverified statement into a fact. Label it and investigate it.

### Prefer useful precision over performative certainty
Use calibrated labels such as `verified`, `supported`, `plausible`, `contested`, `unsupported`, `false`, or `unknown`. State confidence and material limitations.

### Ask fewer, better questions
During the interactive loop, ask one high-leverage question at a time whenever possible. Include a recommended default so progress does not depend on perfect user input.

### Maintain momentum
If the user does not answer a nonessential question, proceed with a clearly labeled provisional assumption. Do not stall the entire funnel.

### Keep the user's language and intent
Retain the user's terminology, metaphors, priorities, and non-negotiables where they improve fidelity. Remove filler, not identity.

## Working State
Maintain the following internal working artifacts throughout the session:
1. **Objective Card** - desired outcome, decision, audience, deadline, success measures, constraints, and non-goals.
2. **Idea Inventory** - atomized ideas with stable IDs.
3. **Essence Map** - themes, distinctive insights, motives, tensions, and causal beliefs.
4. **Claim Ledger** - factual claims, assumptions, evidence status, confidence, and implications.
5. **Option Set** - candidate strategies or solutions.
6. **Decision Ledger** - keep, merge, test, park, reject, and the reason for each decision.
7. **Open Questions** - unresolved issues ordered by decision value.
8. **Action Plan** - milestones, owners, dependencies, tests, metrics, and next actions.

Use stable IDs such as `OBJ-1`, `IDEA-7`, `CLAIM-3`, `OPT-2`, `RISK-4`, and `ACT-5` so later turns can refer to prior material precisely.

## Session Modes
### Capture Mode
Use when the user is still dictating.
- Acknowledge receipt briefly.
- Do not interrupt the flow with analysis unless asked.
- Preserve incomplete, contradictory, emotional, speculative, and half-formed ideas.
- If the brainstorm spans multiple messages, maintain continuity.
- Start full analysis when the user says `done`, `funnel this`, `analyze`, `research this`, or otherwise clearly finishes.
- If completion is genuinely ambiguous, ask only: "Are you still dictating, or should I start the funnel?"

### Funnel Mode
Use after capture is complete. Run the full workflow below.

### Challenge Mode
Use when the user asks to stress-test, red-team, criticize, falsify, or find what is wrong.

### Plan Mode
Use when the user accepts a direction and wants execution details.

### Export Mode
Use when the user asks for a final brief, roadmap, memo, requirements document, research report, project plan, or other reusable artifact.

## Core Workflow
### Phase 1: Establish the Objective
Extract the best current version of:
- **Objective:** What outcome is actually wanted?
- **Decision:** What choice must be made?
- **Why now:** What creates urgency or relevance?
- **Audience or beneficiary:** Who must use, approve, buy, adopt, or benefit?
- **Success measures:** What observable evidence would count as success?
- **Constraints:** Time, money, law, ethics, skills, dependencies, geography, technology, risk tolerance, and fixed commitments.
- **Non-goals:** What is explicitly outside scope?

Draft the Objective Card even if some fields are unknown. Mark inferred content as `provisional`.

If the brainstorm contains several objectives, identify the hierarchy:
- primary objective;
- enabling objectives;
- side quests;
- conflicting objectives.

Do not research broadly until the primary objective and decision are at least provisionally defined.

### Phase 2: Atomize the Brainstorm
Break the brainstorm into atomic units. Each unit should express one meaningful proposition.

Classify every unit as one of:
- `objective`
- `constraint`
- `fact claim`
- `causal claim`
- `assumption`
- `hypothesis`
- `preference/value`
- `idea/option`
- `risk`
- `question`
- `example/anecdote`
- `action`
- `rhetorical/filler`

For each non-filler unit record:
- ID;
- concise normalized statement;
- original wording or a faithful excerpt when useful;
- classification;
- related objective;
- dependencies;
- uncertainty;
- whether it is load-bearing.

A load-bearing item is one whose truth or failure could materially change the recommendation.

### Phase 3: Normalize, Cluster, and De-duplicate
Group related units by meaning, not merely by repeated words.

For each cluster:
1. Write a canonical statement.
2. List the source idea IDs it represents.
3. Preserve qualifiers and disagreements.
4. Distinguish:
   - true duplicates;
   - variants;
   - complements;
   - contradictions;
   - cause-and-effect links;
   - broad idea versus implementation detail.

Use these decisions:
- `KEEP` - distinct and useful.
- `MERGE` - genuinely redundant; retain all source IDs.
- `REFINE` - valuable but vague or overbroad.
- `TEST` - promising but evidence-dependent.
- `PARK` - not currently useful but potentially valuable.
- `REJECT` - clearly irrelevant, disproven, impossible under fixed constraints, or dominated by another option.

Never use `REJECT` merely because an idea is unusual, difficult, or weakly evidenced. Novel but uncertain ideas go to `PARK` or `TEST` with resurrection conditions.

### Phase 4: Build the Essence Map
Summarize the brainstorm's irreducible essence under five headings:
1. **Core intent** - what the user is really trying to achieve.
2. **Distinctive insights** - ideas that would be lost in a generic summary.
3. **Values and preferences** - what the user cares about beyond efficiency.
4. **Tensions and contradictions** - goals or beliefs that pull in different directions.
5. **Emerging thesis** - the strongest coherent interpretation of the brainstorm so far.

Show the Essence Map early. Invite correction before deep convergence if a misread would materially distort the plan.

### Phase 5: Create the Research Plan
Convert the Claim Ledger and decision gaps into research questions.

Prioritize research by expected decision value:
1. Claims that could reverse the recommendation.
2. Claims tied to safety, legality, health, finance, or major cost.
3. Claims that determine feasibility or market reality.
4. Claims that distinguish leading options.
5. Contextual facts that improve implementation.
6. Interesting but nonessential background.

For each research question specify:
- what must be learned;
- why it matters;
- preferred source type;
- freshness requirement;
- jurisdiction or population;
- what evidence would support or weaken the claim.

### Phase 6: Conduct Evidence-Grounded Research
Use available research, browsing, retrieval, data, or document tools. For time-sensitive, niche, disputed, legal, medical, financial, product, market, political, or scientific claims, verify current information rather than relying on memory.

#### Source hierarchy
Prefer, in context:
1. Primary research, original datasets, statutes, regulations, standards, court opinions, filings, and official records.
2. Systematic reviews, meta-analyses, consensus statements, and authoritative technical documentation.
3. Government, university, intergovernmental, and professional-body publications.
4. High-quality investigative or specialist reporting.
5. Reputable secondary explanations.
6. Practitioner reports, case studies, forums, and anecdotes for experience signals only.

Do not treat source prestige as a substitute for relevance or methodological quality.

#### Evidence rules
- Cite every material factual claim.
- Record publication or data date when freshness matters.
- Distinguish what the source directly establishes from your inference.
- Cross-check load-bearing claims with independent sources when practical.
- Note sample, jurisdiction, context, and external-validity limits.
- Report credible disagreement instead of manufacturing consensus.
- Do not fabricate sources, quotations, statistics, or certainty.
- Do not use a search-result snippet as sufficient evidence when the underlying source can be inspected.
- Treat absence of evidence as `unknown` unless the search strategy is strong enough to support a narrower conclusion.

#### Claim status labels
- `VERIFIED` - directly supported by strong, relevant evidence.
- `SUPPORTED` - evidence leans in favor but has limitations.
- `PLAUSIBLE` - reasonable mechanism or indirect support; not established.
- `CONTESTED` - credible sources or studies materially disagree.
- `UNSUPPORTED` - no adequate evidence found after a reasonable search.
- `FALSE` - contradicted by strong evidence.
- `UNKNOWN` - insufficient information to judge.

#### Confidence labels
Use `high`, `medium`, or `low` confidence and explain the primary reason in a short phrase.

### Phase 7: Form Candidate Strategies
Synthesize the surviving material into 2-5 coherent options. An option is not a loose collection of ideas; it must have:
- a clear mechanism;
- target user or beneficiary;
- required resources;
- major dependencies;
- expected upside;
- primary risk;
- critical assumptions;
- first test.

Include a `hybrid` option only when the components are compatible and the combination has a clear advantage.

Include `do nothing`, `delay`, or `run a small test first` when they are genuine alternatives.

### Phase 8: Evaluate Without False Precision
Define decision criteria from the Objective Card before scoring options.

Default criteria:
- objective fit;
- evidence strength;
- expected impact;
- feasibility;
- cost and time;
- risk and downside;
- reversibility and option value;
- strategic differentiation;
- user values and acceptability.

Use ordinal scores such as `strong`, `medium`, `weak` or `1-5`. Weights may be used, but explain them and do not imply mathematical certainty.

For every leading option show:
- strongest case for;
- strongest case against;
- decisive unknown;
- what would change the ranking;
- cheapest informative test.

Protect originality: evaluate originality and feasibility separately before combining them. Do not allow ease of implementation to silently dominate novelty or long-term value.

### Phase 9: Adversarial Challenge
Run all of the following on the leading direction:

#### Consider the opposite
Generate the strongest reasons the current leading idea, assumption, estimate, or anchor could be wrong.

#### Alternative explanations
For important observations, generate at least two credible alternative causal explanations.

#### Prospective hindsight / pre-mortem
Assume the plan was implemented and failed. Identify the most plausible causes, warning signs, and preventions.

#### Base-rate and outside-view check
Where relevant, compare the plan with analogous projects, markets, products, interventions, or decisions.

#### Incentive and stakeholder check
Identify who benefits, who bears cost, who can block progress, and where stated incentives differ from actual behavior.

#### Dependency check
Find single points of failure, hidden prerequisites, sequencing errors, and circular dependencies.

#### Ethical and safety check
Identify foreseeable harm, privacy concerns, legal constraints, conflicts of interest, manipulation risk, and affected non-users.

Update the Claim, Risk, and Decision Ledgers after the challenge. Do not merely append criticism; change the plan when evidence warrants it.

### Phase 10: Interactive Convergence Loop
After the first synthesis, continue in focused turns.

Each turn should contain:
1. **Current convergence:** the leading conclusion in 1-3 sentences.
2. **What changed:** only the meaningful delta from the prior turn.
3. **One high-value decision:** the question whose answer most reduces uncertainty or resolves a tradeoff.
4. **Recommended default:** what to assume or choose and why.
5. **Consequence:** how each likely answer changes the plan.

Good questions resolve:
- objective ambiguity;
- hard constraints;
- risk tolerance;
- target audience;
- success threshold;
- option tradeoffs;
- missing proprietary facts;
- commitment to a test or action.

Avoid low-value preference questions that can be resolved by a reasonable default.

Do not repeat the entire report on every turn. Maintain the ledgers and show only updated sections unless the user requests a full snapshot.

### Phase 11: Convert the Decision Into Execution
Once a direction is selected, create:

#### Decision statement
A one-sentence commitment specifying what will be done, for whom, and why.

#### Assumption register
List critical assumptions, confidence, validation method, owner, and review date or trigger.

#### Milestones
Define outcome-based milestones rather than vague activity lists.

#### Immediate actions
For each action include:
- action;
- owner if known;
- due date or sequence;
- dependency;
- expected output;
- acceptance criterion;
- evidence or metric;
- status.

#### Implementation intentions
For predictable obstacles, add explicit if-then rules:
- `If [trigger or obstacle], then [specific response].`

#### Learning loop
Define:
- what will be measured;
- when it will be reviewed;
- thresholds to continue, modify, pause, or stop;
- what new evidence would reopen a parked option.

## Default Output Format
Use this structure for the first full funnel unless the user requests another format:

### Evidence Funnel - Working Brief
#### 1. Objective Card
#### 2. Executive Convergence
A concise statement of the strongest current interpretation and recommended direction.

#### 3. Essence Preserved
The core intent, distinctive insights, values, and tensions retained from the original brainstorm.

#### 4. Clean Idea Architecture
Themes, canonical ideas, relationships, and contradictions.

#### 5. What Was Filtered
A compact ledger of merged, parked, and rejected material with reasons and resurrection conditions.

#### 6. Research Findings
A Claim Ledger table:

| ID | Claim | Status | Confidence | Best evidence | Limitation | Planning implication |
|---|---|---|---|---|---|---|

#### 7. Options
A comparison of 2-5 coherent strategies.

#### 8. Challenge Results
Counterarguments, alternatives, pre-mortem, base rates, incentives, dependencies, and safety concerns.

#### 9. Recommendation
The recommendation, rationale, key tradeoffs, and conditions under which it should change.

#### 10. Concrete Plan
Milestones, immediate actions, tests, metrics, dependencies, and if-then responses.

#### 11. Open Decisions
Only unresolved questions that could materially change the plan, ordered by decision value.

#### 12. Next Interactive Question
Ask one high-value question and include the recommended default.

## Completion Gates
Continue the funnel until all applicable gates pass or the user explicitly stops:
- The primary objective is stated in one clear sentence.
- The decision to be made is explicit.
- Success measures and hard constraints are known or labeled provisional.
- The brainstorm has been atomized and de-duplicated.
- The user's distinctive insights and values are visibly preserved.
- Load-bearing claims are verified or clearly labeled uncertain.
- Leading options are coherent and compared against explicit criteria.
- The preferred option has survived a meaningful challenge.
- Major risks, dependencies, and ethical concerns have responses.
- The recommendation includes conditions that would change it.
- The plan has concrete next actions and learning metrics.
- Remaining questions are few, material, and ordered.

If user interaction ends before all gates pass, produce a `Provisional Final` that states:
1. the best current plan;
2. assumptions made;
3. unresolved decision-critical questions;
4. the first reversible action that creates useful evidence.

## Quality Checks
Before presenting any synthesis, verify:
- Did I preserve unique ideas before merging or rejecting them?
- Did I separate facts from assumptions and preferences?
- Did I research the claims that actually drive the decision?
- Are citations attached to the claims they support?
- Did I confuse correlation, mechanism, prediction, or anecdote with causation?
- Did I overvalue familiar or easy ideas?
- Did I generate a serious counter-case?
- Did the challenge materially update the plan where appropriate?
- Is the recommendation conditional rather than falsely certain?
- Can the user act on the next step without another planning session?

## Anti-Patterns
Never:
- Summarize the brainstorm into generic platitudes.
- Delete unusual ideas without preserving them in the ledger.
- Treat repetition as additional evidence.
- Research every sentence equally instead of prioritizing decision value.
- Present unsupported assumptions as facts.
- Cite sources that were not inspected.
- Invent consensus when sources disagree.
- Use a weighted score to hide subjective judgment.
- Ask a long questionnaire before producing any value.
- Overwhelm the user with the entire working state every turn.
- Expose or claim to expose hidden chain-of-thought.
- Stop at "more research is needed" without identifying the cheapest useful test.

## Compact Interaction Example
**User input:** A long dictation mixing a product idea, target users, pricing guesses, concerns, repeated features, personal motivations, and possible launch channels.

**First useful response:**
1. A provisional Objective Card.
2. An Essence Map preserving the distinctive product thesis.
3. A cleaned inventory separating features, assumptions, risks, and questions.
4. A prioritized research plan focused on market size, user pain, substitutes, willingness to pay, and regulatory constraints.
5. One high-value question, such as the primary target user, with a recommended default.

**Later response after research:**
1. Claim Ledger with evidence and uncertainty.
2. Three coherent go-to-market options.
3. Option comparison and pre-mortem.
4. Recommended small, reversible validation test.
5. Concrete next actions and decision thresholds.

## Research Basis for This Skill
This workflow operationalizes findings from creativity, judgment, decision-making, forecasting, and self-regulation research. These references justify design choices; they are not universal guarantees.
- Diehl, M., & Stroebe, W. (1987). Productivity loss in brainstorming groups: Toward the solution of a riddle. *Journal of Personality and Social Psychology, 53*(3), 497-509. https://doi.org/10.1037/0022-3514.53.3.497
  - Supports capturing ideas without conversational production blocking and separating generation from evaluation.
- Paulus, P. B., & Yang, H.-C. (2000). Idea generation in groups: A basis for creativity in organizations. *Organizational Behavior and Human Decision Processes, 82*(1), 76-87. https://doi.org/10.1006/obhd.2000.2888
  - Supports written idea exchange, attentive processing, and later reflection or incubation.
- Nijstad, B. A., & Stroebe, W. (2006). How the group affects the mind: A cognitive model of idea generation in groups. *Personality and Social Psychology Review, 10*(3), 186-213. https://doi.org/10.1207/s15327957pspr1003_1
  - Supports structured retrieval, cognitive stimulation, and protection against interference during ideation.
- Rietzschel, E. F., Nijstad, B. A., & Stroebe, W. (2010). The selection of creative ideas after individual idea generation: Choosing between creativity and impact. *British Journal of Psychology, 101*(1), 47-68. https://doi.org/10.1348/000712609X414204
  - Supports explicit selection criteria and separate evaluation of originality and feasibility.
- Berg, J. M. (2016). Balancing on the creative highwire: Forecasting the success of novel ideas in organizations. *Administrative Science Quarterly, 61*(3), 433-468. https://doi.org/10.1177/0001839216642211
  - Supports treating creative forecasting as a distinct task and avoiding overconfidence in idea selection.
- Koriat, A., Lichtenstein, S., & Fischhoff, B. (1980). Reasons for confidence. *Journal of Experimental Psychology: Human Learning and Memory, 6*(2), 107-118. https://doi.org/10.1037/0278-7393.6.2.107
  - Supports eliciting evidence against a preferred answer to improve confidence calibration.
- Hirt, E. R., & Markman, K. D. (1995). Multiple explanation: A consider-an-alternative strategy for debiasing judgments. *Journal of Personality and Social Psychology, 69*(6), 1069-1086. https://doi.org/10.1037/0022-3514.69.6.1069
  - Supports generating multiple credible explanations rather than defending the first story.
- Mussweiler, T., Strack, F., & Pfeiffer, T. (2000). Overcoming the inevitable anchoring effect: Considering the opposite compensates for selective accessibility. *Personality and Social Psychology Bulletin, 26*(9), 1142-1150. https://doi.org/10.1177/01461672002611010
  - Supports the mandatory consider-the-opposite challenge.
- Mitchell, D. J., Russo, J. E., & Pennington, N. (1989). Back to the future: Temporal perspective in the explanation of events. *Journal of Behavioral Decision Making, 2*(1), 25-38. https://doi.org/10.1002/bdm.3960020103
  - Supports prospective hindsight and pre-mortem analysis.
- Mellers, B., Ungar, L., Baron, J., et al. (2014). Psychological strategies for winning a geopolitical forecasting tournament. *Psychological Science, 25*(5), 1106-1115. https://doi.org/10.1177/0956797614524255
  - Supports probabilistic thinking, training, collaboration, tracking, and updating predictions.
- Gollwitzer, P. M., & Sheeran, P. (2006). Implementation intentions and goal achievement: A meta-analysis of effects and processes. *Advances in Experimental Social Psychology, 38*, 69-119. https://doi.org/10.1016/S0065-2601(06)38002-1
  - Supports converting intentions into explicit if-then action rules.
- Harrell, M. (2011). Argument diagramming and critical thinking in introductory philosophy. *Higher Education Research & Development, 30*(3), 371-385. https://doi.org/10.1080/07294360.2010.502559
  - Supports atomizing claims and making support, objection, and inference relationships visible.

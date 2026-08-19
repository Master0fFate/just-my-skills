---
name: calibrate-how-we-work
description: >
  Run an explicit, evidence-seeking calibration interview to learn the user's
  durable collaboration, communication, learning, decision-making, and
  problem-solving preferences, then propose an "About me / How I think"
  section for AGENTS.md. Use only when the user explicitly invokes
  /calibrate-how-we-work or directly asks to run this calibration interview,
  build their collaboration profile, or update how the agent should work with
  them. Never auto-invoke from ordinary conversation, onboarding, project
  planning, isolated preference statements, or a request to personalize one
  response.
---

# Calibrate How We Work

## Purpose

Build a durable, evidence-based model of **how the user works with an AI**, not what the user is currently building.

The goal is to convert a careful interview into concrete instructions that help future agents:

- explain information effectively;
- structure choices appropriately;
- respond well when the user is stuck;
- handle uncertainty and ambiguity;
- give criticism in a useful form;
- adapt when the user is rushed, tired, frustrated, or overloaded;
- avoid communication patterns that make the user disengage;
- distinguish stable preferences from temporary states;
- avoid repeatedly rediscovering the same collaboration preferences.

The final result is a proposed:

`## About me / How I think`

section for `AGENTS.md`.

Do **not** write or modify `AGENTS.md` until the user has seen and explicitly approved the draft.

---

# Invocation Contract

This is an **explicit-use calibration skill**.

Run it only when at least one of these conditions is true:

1. The user explicitly invokes `/calibrate-how-we-work`.
2. The user directly asks for an interview about how they think or work.
3. The user explicitly asks to build or update a durable collaboration profile.
4. The user explicitly asks to create or revise the relevant personalization section in `AGENTS.md`.

Do not invoke this skill merely because:

- the user expressed one preference;
- the user appears frustrated;
- the user asked for a different writing style;
- a project is beginning;
- personalization might be useful;
- the agent believes it could understand the user better;
- the user gives biographical information;
- ordinary requirements gathering is needed.

A single preference is not permission to construct a user model.

---

# Scope

Focus on **interaction-relevant behavior**.

Explore:

- learning;
- problem-solving;
- abstraction level;
- information density;
- decision-making;
- uncertainty;
- recommendations;
- criticism;
- frustration;
- ambiguity;
- communication;
- attention and task structure;
- working under pressure;
- signs that the agent should change approach.

Do not turn the interview into:

- project discovery;
- biography collection;
- personality typing;
- therapy;
- psychological diagnosis;
- intelligence assessment;
- productivity ideology;
- values interrogation;
- demographic profiling.

If project details appear in an answer, use them only as evidence about the user's working behavior.

Example:

> "I rewrote the API three times because I wanted to understand every layer."

Relevant inference:

> The user may learn technical systems by rebuilding or manipulating them directly.

Irrelevant inference:

> The user's API architecture preferences should be permanently stored.

Keep those separate.

---

# Calibration Standard

Treat every answer as **evidence**, not automatically as fact.

The interview should distinguish between:

1. what the user says they prefer;
2. what the user reports actually doing;
3. what happens in specific examples;
4. what changes by context;
5. what the user wishes they did;
6. what appears to be a durable pattern;
7. what may only describe the user's current mood or situation.

Prefer evidence in this order:

1. repeated behavior across concrete examples;
2. one concrete recent example;
3. explicit preference with a clear operational description;
4. abstract self-description;
5. hypothetical behavior.

Do not confuse aspiration with observed behavior.

For example:

> "I like concise answers."

is weak evidence by itself.

Better calibration asks what "concise" means operationally:

- conclusion first?
- five bullets instead of fifteen?
- short initial answer with optional depth?
- no repeated explanation?
- less background but full technical detail?

The useful unit is not the label.

The useful unit is the **behavioral instruction**.

---

# Interview Mode

Ask **one primary question at a time**.

Wait for the user's answer before continuing.

Do not display the full questionnaire in advance unless the user asks for it.

Keep the interaction conversational rather than clinical.

A normal turn should contain:

1. optionally, one short acknowledgment or reflection;
2. one question.

Avoid summarizing every answer.

Avoid excessive praise or agreement.

Do not tell the user what their answer supposedly reveals before enough evidence exists.

---

# Interview Length

Target:

- **12 core calibration areas**
- plus **3-6 adaptive probes or validation questions**

A typical calibration should therefore contain approximately **15-18 answered questions**.

Do not mechanically hit a number.

Stop earlier when evidence is unusually clear.

Use additional probes when:

- an answer is vague;
- an answer contains an important condition;
- two answers conflict;
- the user uses an abstract label;
- a statement sounds absolute;
- the practical implication remains unclear.

Do not exceed approximately **20 answered questions** during the default calibration unless there is a strong reason.

Accuracy is more important than questionnaire completion.

---

# Adaptive Probe Rules

## If an answer is vague

Ask for behavior.

Examples:

- "What would that look like in practice?"
- "Can you give me a recent example?"
- "What would I actually do differently if I knew that?"
- "What usually happens right before you get frustrated?"

Do not accept broad labels when operational detail matters.

---

## If the user gives an absolute rule

Test for exceptions.

Examples:

- "Is that true most of the time, or are there situations where you want the opposite?"
- "Can you think of a case where that approach would annoy you?"

Do not convert words such as `always`, `never`, `hate`, or `need` into permanent rules without checking context.

---

## If two answers appear inconsistent

Do not choose one.

Surface the difference neutrally.

Example:

> "Earlier you preferred one clear recommendation, but here you wanted several alternatives. What determines which mode you want?"

A contradiction often means the preference is conditional.

Discover the condition.

---

## If the user gives a personality label

Translate it into observable behavior.

Examples:

Instead of storing:

> "I am a visual learner."

Determine things such as:

> "Architecture becomes easier for me when relationships are shown spatially before implementation details."

Instead of:

> "I overthink."

Determine:

> "For reversible decisions, too many alternatives make me reopen decisions that were already good enough."

Store the actionable version.

---

## If an answer contains strong evidence

Do not interrogate it merely because follow-ups are available.

Move on.

The interview must feel adaptive, not bureaucratic.

---

# Core Calibration Areas

Cover these areas naturally.

The exact order can change based on previous answers.

## 1. Learning

Learn how the user actually acquires difficult information.

Prefer a behavioral opening such as:

> Think about the last time you learned something difficult unusually well. What did you actually do that made it click?

Explore when useful:

- reading;
- examples;
- explanation;
- experimentation;
- building;
- repetition;
- diagrams;
- analogies;
- teaching it back;
- breaking and repairing things.

Do not prematurely classify the user into a fixed "learning style."

---

## 2. Getting Stuck

Determine what happens when progress stops.

Explore:

- pushing longer;
- changing abstraction level;
- testing;
- searching;
- asking for help;
- restarting;
- stepping away;
- becoming frustrated;
- needing a smaller next action.

Find out what the agent should do at that moment.

---

## 3. Big Picture vs. Details

Determine the user's preferred entry point.

Possible patterns include:

- model first, implementation second;
- details first, abstraction later;
- example first, principle afterward;
- goal first, then constraints;
- different approaches for familiar and unfamiliar topics.

Avoid reducing this to a binary unless the evidence supports one.

---

## 4. Decision-Making

Explore:

- instinct versus analysis;
- reversible versus irreversible decisions;
- desired evidence;
- tolerance for uncertainty;
- second-guessing;
- decision speed;
- when additional analysis stops being useful.

Find the threshold at which more options become noise.

---

## 5. Recommendation Style

Determine when the user wants:

- one strong recommendation;
- a ranked shortlist;
- several neutral options;
- trade-offs;
- a recommendation plus alternatives;
- the reasoning before the recommendation.

Ask what makes each format useful or irritating.

---

## 6. Explanation Shape

Determine preferred structure.

Explore:

- answer first versus context first;
- concise default versus comprehensive default;
- examples;
- analogy;
- technical precision;
- step-by-step sequencing;
- optional deeper sections;
- repetition;
- summaries.

Operationalize vague preferences such as "detailed" or "simple."

---

## 7. Ambiguity

Determine how the agent should react when the user's request is incomplete or unclear.

Possible preferences include:

- infer the most likely intent and proceed;
- state the assumption and proceed;
- provide two interpretations;
- ask one targeted question;
- avoid questions unless the ambiguity materially affects the answer.

Separate harmless ambiguity from consequential ambiguity.

---

## 8. Friction and Disengagement

Find what causes the user to mentally switch off.

Explore patterns such as:

- repetition;
- excessive caveats;
- long introductions;
- unexplained jargon;
- unnecessary questions;
- weak recommendations;
- overly confident claims;
- excessive formatting;
- too little context;
- too much context;
- patronizing language;
- slow progress.

Ask for concrete examples when possible.

---

## 9. Criticism and Correction

Determine how the user prefers feedback on their work.

Explore:

- directness;
- severity;
- explanation;
- prioritization;
- alternatives;
- separating factual problems from preference;
- whether praise before criticism helps or dilutes the message.

Also determine how the agent should respond when the user criticizes **the agent**.

---

## 10. Working Under Pressure

Explore how useful interaction changes when the user is:

- tired;
- rushed;
- frustrated;
- overloaded;
- switching between tasks.

Determine what the agent should change.

Examples could include:

- shorter answers;
- fewer branches;
- one next action;
- stronger prioritization;
- less explanation;
- explicit checkpoints;
- no unnecessary questions.

Do not assume these states from writing style alone.

---

## 11. Task and Attention Structure

Determine how larger pieces of work should be shaped.

Explore:

- large plan versus immediate next step;
- visible progress;
- checkpoints;
- parallel options;
- unfinished branches;
- reminders of previous context;
- explicit priorities;
- breaking work into short actions.

Focus on useful interaction, not diagnosis.

---

## 12. Common Misreadings

Ask what people who know the user well understand that new collaborators often miss.

Explore observable signals.

For example:

- brevity does not necessarily mean annoyance;
- asking many questions may indicate interest rather than disagreement;
- silence may mean thinking;
- "fine" may or may not have a special meaning;
- blunt language may not imply hostility.

Never invent these interpretations.

Only encode cues the user explicitly validates.

---

# Objectivity and Anti-Bias Rules

The goal is a useful model, not a flattering model.

Do not:

- agree automatically with the user's self-description;
- turn one anecdote into a general trait;
- interpret every answer as evidence of exceptional ability;
- pathologize ordinary behavior;
- diagnose neurodivergence or mental-health conditions;
- infer sensitive traits;
- infer motives without evidence;
- convert communication style into character judgments;
- use personality frameworks unless explicitly requested;
- create deterministic rules from weak evidence.

Prefer formulations such as:

> "When exploring an unfamiliar technical system, the user usually benefits from..."

over:

> "The user is the kind of person who..."

Prefer:

> "Evidence so far suggests..."

during calibration.

Use stronger permanent language only after validation.

---

# Context Separation

For every meaningful preference, determine whether it is:

- broadly stable;
- task-dependent;
- stakes-dependent;
- familiarity-dependent;
- time-pressure-dependent;
- mood/state-dependent;
- uncertain.

Examples:

The user may want:

- many options during exploration;
- one recommendation during execution.

Or:

- deep explanation when learning;
- short answers when debugging.

Or:

- direct criticism of technical work;
- more context when discussing subjective creative decisions.

These are not contradictions.

They are conditional policies.

Capture the condition.

---

# Confidence Model

Maintain concise calibration notes during the interview.

For each candidate rule, track:

- **pattern**
- **supporting evidence**
- **important conditions**
- **counterexamples**
- **confidence**
- **possible agent instruction**

Use three confidence levels.

### High confidence

Use when:

- multiple concrete examples support the same pattern; or
- the user gives a clear operational preference and it survives an exception test.

### Medium confidence

Use when:

- one strong concrete example supports the pattern; or
- the preference is explicit but materially context-dependent.

### Low confidence

Use when:

- evidence is only abstract self-description;
- the answer is hypothetical;
- the evidence conflicts;
- the practical meaning remains unclear.

Do not put low-confidence claims into the durable profile as facts.

Probe them, qualify them, or omit them.

---

# Falsification Pass

Before producing the final profile, actively try to find where the emerging model fails.

Do not merely ask more questions that confirm existing conclusions.

Use approximately 2-4 validation questions such as:

> Which of the patterns we've discussed has the biggest exception?

> What is something an assistant could conclude from your answers that would actually be wrong?

> When would you want me to do the opposite of your normal preference?

> What do people or assistants tend to overdo once they learn one of your preferences?

Ask these one at a time.

Use the answers to weaken, condition, or remove inaccurate rules.

---

# Final Calibration Check

Before drafting `AGENTS.md`, briefly summarize the strongest provisional patterns.

Do not present an essay.

Use a compact set of approximately 5-8 statements.

Then ask one calibration question:

> Which of these is wrong, incomplete, or missing an important condition?

Resolve meaningful corrections before drafting the persistent profile.

Then ask one final question if necessary:

> What important rule for working well with you have we still missed?

Do not add speculative instructions just to make the profile feel complete.

---

# Converting Evidence Into Agent Instructions

The final profile must be **operational**.

Bad:

> The user likes detail.

Better:

> When explaining an unfamiliar system, start with the overall model, then provide enough implementation detail for the user to reconstruct how it works.

Bad:

> The user gets overwhelmed.

Better:

> When several tasks are competing for attention, reduce the response to the highest-priority decision and the next concrete action before expanding.

Bad:

> The user is intuitive.

Better:

> For reversible decisions, give a recommended default quickly rather than requiring exhaustive comparison first.

Bad:

> The user hates criticism.

Better:

> When criticizing work, identify the concrete problem and its impact before proposing a replacement; do not pad technical criticism with generic praise.

Write instructions that another capable agent can **execute**.

---

# AGENTS.md Draft Structure

Produce a draft similar to:

## About me / How I think

### Learning and understanding
- [Concrete instructions derived from evidence.]

### Communication
- [Concrete instructions derived from evidence.]

### Decisions and recommendations
- [Concrete instructions derived from evidence.]

### When I am stuck
- [Concrete instructions derived from evidence.]

### Feedback and disagreement
- [Concrete instructions derived from evidence.]

### When I am rushed or overloaded
- [Concrete instructions derived from evidence.]

### Important context and exceptions
- [Conditions that prevent overgeneralization.]

Only include sections that contain useful information.

Do not force every heading to appear.

Prefer approximately **8-15 strong instructions** over dozens of weak observations.

---

# Writing Style for the Profile

Instructions in `AGENTS.md` should be:

- concrete;
- concise;
- behavioral;
- context-aware;
- easy for another agent to execute;
- based on validated evidence.

Prefer:

> Lead with one recommended path when the user is trying to execute. During exploration, alternatives are useful if their trade-offs are meaningfully different.

Avoid:

> The user prefers recommendations but also sometimes likes options.

Prefer:

> If the user's request is slightly underspecified but the likely intent is low-risk, state the assumption briefly and proceed instead of stopping for clarification.

Avoid:

> The user doesn't like questions.

Preserve nuance without creating paragraphs of personality analysis.

---

# Persistence and Privacy

The interview can contain personal information.

Only persist information that is directly useful for future collaboration.

Do not persist unnecessary:

- medical information;
- diagnoses;
- trauma;
- political beliefs;
- religion;
- sexuality;
- private relationship information;
- demographic information;
- unrelated biography.

If sensitive information is relevant to a working preference, store the **interaction rule** rather than the sensitive explanation whenever possible.

Example:

Prefer:

> When cognitive load is high, reduce the number of simultaneous choices.

over storing an unnecessary medical reason for that preference.

The user must see the exact proposed persistent text before it is written.

---

# Approval Gate

After calibration:

1. Generate the proposed `## About me / How I think` section.
2. Show the complete draft to the user.
3. Make clear that it is only a draft.
4. Do not modify files yet.
5. Wait for explicit approval or requested edits.
6. Apply requested edits to the draft.
7. Only after explicit approval, update `AGENTS.md`.

Approval can be expressed naturally with language such as:

- "approved";
- "save it";
- "write that";
- "looks good, add it";
- equivalent explicit permission.

Silence or moving to another topic is not approval.

---

# Updating an Existing Profile

If `AGENTS.md` already contains an `About me / How I think` section:

1. Read it before interviewing.
2. Treat its contents as previous hypotheses, not unquestionable facts.
3. Look for:
   - outdated preferences;
   - overgeneralizations;
   - contradictions;
   - missing context;
   - instructions the user no longer wants.
4. Use the interview to validate or revise them.
5. Show the replacement section or exact proposed changes before editing.
6. Do not create duplicate profile sections.

Preserve all unrelated `AGENTS.md` content.

---

# Failure Modes to Avoid

Do not:

- ask the entire questionnaire at once;
- follow a rigid script when an answer deserves a probe;
- probe every answer unnecessarily;
- repeatedly paraphrase what the user just said;
- flatter the user;
- psychoanalyze the user;
- treat self-description as objective fact;
- confuse project preferences with durable personal preferences;
- store temporary frustration as a permanent rule;
- assume current behavior applies in all contexts;
- erase contradictions instead of explaining them;
- infer hidden meanings from wording without validation;
- write generic advice such as "be clear and concise";
- produce a personality essay instead of agent instructions;
- modify `AGENTS.md` before explicit approval.

---

# Completion Standard

Calibration is complete when the agent has enough evidence to answer:

1. How should information normally be introduced?
2. How should depth and detail be controlled?
3. How does the user learn unfamiliar material?
4. What should happen when the user is stuck?
5. How should choices and recommendations be presented?
6. How should uncertainty be handled?
7. What communication patterns cause friction?
8. How should criticism or disagreement be delivered?
9. What should change under time pressure or low bandwidth?
10. Which preferences are conditional rather than universal?
11. What common misreadings should the agent avoid?
12. Which conclusions have enough evidence to persist?

If several of these remain uncertain, continue calibration rather than filling the gaps with guesses.

---

# First Question

Unless previous context makes another opening substantially better, begin with:

> Think about the last time you learned something difficult and it clicked unusually well. What did you actually do that helped you understand it?

Then continue one question at a time.

Do not preview the remaining questions.
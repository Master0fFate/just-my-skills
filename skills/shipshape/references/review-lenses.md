# Review lenses

Contents: [Universal checks](#universal-checks) | [Software, websites, APIs, and tools](#software-websites-apis-and-tools) | [Documents, designs, presentations, and learning materials](#documents-designs-presentations-and-learning-materials) | [Research, data, models, and experiments](#research-data-models-and-experiments) | [Services, internal processes, and operations](#services-internal-processes-and-operations) | [Early concepts and viability](#early-concepts-and-viability)

Use only the sections that match the project. These are prompts for inspection,
not mandatory features or claims of compliance. Add relevant domain checks when
needed. Explain important exclusions.

## Universal checks

**Purpose and value.** Identify the audience, problem, desired outcome, and
alternative, including doing nothing. Check whether the main value is clear.
Separate direct evidence of demand from the team's assumptions. For internal
work, check usefulness and adoption rather than requiring a revenue model.

**Function.** Follow a core workflow from input to useful result. Check invalid,
empty, repeated, and interrupted inputs where relevant. Check recovery and
handoffs. Identify placeholders and manual steps that prevent completion.

**Usability.** Check the actual audience's first useful outcome. Inspect labels,
sequence, feedback, help, errors, and recovery. Include keyboard use and other
relevant access needs. Test expert efficiency only when experts are in scope.

**Structure.** Check whether responsibilities, information, and dependencies are
clear. Look for a specific maintenance problem before proposing a new design.
Identify who will maintain the work and what they need to know.

**Trust.** Identify sensitive data, destructive actions, important failure modes,
and unsupported claims. Check permissions, safe defaults, reversibility, and
error visibility. Use specialist review for high-stakes requirements.

**Efficiency.** Define the relevant workload before measuring. Consider user
time, response time, labor, compute, storage, and ongoing costs. Improve a
measured or clearly demonstrated bottleneck, not a hypothetical one.

**Delivery.** Check distribution, setup, ownership, support, and operating needs.
Separate delivery feasibility from observed adoption. Check whether the team
can support the next milestone under its actual constraints.

**Simplicity.** Propose keep, add, change, remove, and defer decisions when useful.
State the problem each addition solves. Before removal, check dependencies,
compatibility, active users, and recovery options.

## Software, websites, APIs, and tools

Inspect project instructions, version-control state, manifests, lockfiles,
entry points, tests, configuration, and deployment assumptions. Do not assume
a framework, package manager, or test command.

Trace a representative input through the real application to persistence or
output. Check authentication separately from authorization. Review validation,
error handling, duplicate requests, state changes, data integrity, and recovery
where relevant. Do not test destructive flows against production data.

For user interfaces, inspect actual rendered states when tools permit. Check
loading, empty, error, success, and disabled states. Check relevant screen sizes,
keyboard operation, focus order, readable content, and feedback after actions.
Do not claim visual verification from source code alone.

For APIs and command-line tools, check contracts, examples, meaningful errors,
output consistency, configuration, exit behavior, and compatibility. Do not
require a graphical interface when it adds no user value.

Check boundaries between components, dependency risk, maintainability, and
operating visibility. Measure performance with a stated workload. Add scale,
failover, or distributed systems only when the milestone calls for them.

Evidence may include a reproduction, test output, inspected runtime state,
request and response samples, measurements, or a focused change review. State
which integrations were live, local, simulated, or unavailable.

## Documents, designs, presentations, and learning materials

Identify the reader, decision or action, delivery format, and review criteria.
Check correctness, completeness, sequence, terminology, internal consistency,
and links between claims and sources. Identify unsupported or outdated claims.

Inspect both content and final form. Check navigation, headings, diagrams,
labels, tables, references, and accessible presentation where relevant. Render
the actual artifact when possible. Check clipping, missing content, page or
slide order, readable sizes, and broken links. Use format-specific tools.

For learning materials, check prerequisites, task order, worked examples,
practice, and whether the assessment tests the intended skill. For a design
prototype, test the available interactions but keep implementation readiness
separate from prototype quality.

Revise the artifact in Improve mode. Preserve the user's meaning and approved
style. Do not add a backend audit to a document review. When source files are
unavailable, produce a usable revision or an exact change specification.

## Research, data, models, and experiments

Identify the question, available evidence, intended use, and limits of the data.
Check data origin, permissions, missing values, duplicates, sampling, units,
transformations, and reproducibility where relevant.

For predictive models, inspect the baseline, metric choice, training and test
separation, leakage risks, error slices, and the intended use conditions.
Separate an offline result from a live-use claim. Do not call an experiment
reproduced unless it was actually rerun under recorded conditions.

For analysis, check whether conclusions follow from the method and results.
Separate association from causal evidence. Report uncertainty and alternate
explanations. Do not fabricate participants, observations, results, or citations.

Use a held-out check, a data-quality test, a sensitivity analysis, a reproducible
run, or a better experiment plan as appropriate. When evidence is insufficient,
improve the validation design rather than making the conclusion more confident.

## Services, internal processes, and operations

Map the request, inputs, responsible people, handoffs, completion condition,
and recovery route. Identify queues, duplicated effort, unclear ownership,
manual exceptions, and dependence on one person.

Check forms, templates, instructions, access, data handling, training, support,
and maintenance. Estimate costs only from stated assumptions or measurements.
Test a process with a safe example or simulation before changing live operation.
Label simulated completion as simulated.

A useful improvement can be a revised procedure, clearer ownership, a simpler
handoff, a prototype, or a tested automation. Do not automate a poorly defined
process merely because automation is available. Do not send messages, change
schedules, or contact staff without authorization.

## Early concepts and viability

For a concept with no working product, assess problem clarity, audience,
assumptions, alternatives, feasibility, and a useful next test. Mark runtime
functionality as unavailable or not applicable to the concept milestone.

Choose a small validation step tied to the riskiest assumption. Define the
participant group, task, observation method, and success rule before collecting
results. Use practical evidence such as task completion, repeat use, a real
commitment, or delivery cost when those measures fit the project.

Do not equate compliments, attractive mockups, or a competitor's success with
validated demand. Do not contact participants or spend money without approval.
A concept may be ready for a pilot while demand remains unknown. State both.

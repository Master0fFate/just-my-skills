# Examples

Contents: [Software: review and improve](#software-review-and-improve) | [Document: improve the actual artifact](#document-improve-the-actual-artifact) | [Review only: no edits](#review-only-no-edits) | [Concept: do not manufacture demand](#concept-do-not-manufacture-demand) | [Limited tools: useful work without false claims](#limited-tools-useful-work-without-false-claims) | [Existing changes and a failed baseline](#existing-changes-and-a-failed-baseline) | [A narrow request should stay narrow](#a-narrow-request-should-stay-narrow)

These examples illustrate intended behavior. They are not records of tests or
projects executed during skill creation.

## Software: review and improve

**Request:** "Use Shipshape on this app. Prepare the import flow for a small pilot."

**Mode:** Improve.

Inspect the repository instructions and current changes. Identify who will use
the import flow and what the pilot requires. Run a baseline with safe sample
data. Suppose inspection reveals that invalid rows stop the entire import.
Record the reproduction and its user effect. Define expected handling for both
valid and invalid rows from the actual product requirements.

Fix the cause within the existing design. Add focused tests. Check the full
import workflow and an adjacent export or read workflow. Preserve unrelated
changes. A blocked live-service test stays blocked; it is not a passed
integration. Report pilot readiness separately from demand.

**Do not:** replace the framework, add unrelated features, or deploy the app
without authorization.

## Document: improve the actual artifact

**Request:** "Make this onboarding guide shipshape for new team members."

**Mode:** Improve.

Define the first task a new team member should complete. Inspect the guide and
its referenced resources. Find missing prerequisites, unclear steps, inconsistent
terms, and broken links. Revise the supplied guide rather than only listing
problems. Inspect the final rendered format when tools permit.

A useful criterion is that the reader can identify the required access, perform
the example task, and find a recovery step. A content review can verify that
these instructions exist. Only an actual user test can show observed completion.

**Do not:** invent a successful user trial or add irrelevant software architecture
requirements.

## Review only: no edits

**Request:** "Is this repository ready to hand over? Audit only. Do not edit files."

**Mode:** Audit.

Use read-only inspection. Run checks only when their side effects are compatible
with the user's restriction. Report findings in the conversation unless a report
file was requested. Explain any checks that could not safely run. State that no
project files were changed.

**Do not:** fix an obvious bug, create a tracker, install a dependency, or format
files without permission. A broad improvement skill does not cancel a narrow
write restriction.

## Concept: do not manufacture demand

**Request:** "Use Shipshape on this service idea. Will people use it?"

**Mode:** Audit because the request asks for a viability assessment.

Review the problem, audience, alternatives, assumptions, and operating plan.
Name what the supplied material proves and what remains unknown. Define a small
validation experiment with a participant group, task, observation, and success
rule. State which prototype or plan changes would support that experiment.

**Verdict scope:** readiness for the validation experiment, not confirmed demand.

**Do not:** fabricate interviews, contact prospects, incur costs, or guarantee
commercial viability.

## Limited tools: useful work without false claims

**Request:** "Fix and verify the issues in these source files."

**Mode:** Improve when explicitly using Shipshape for the broader review.

Inspect the supplied files. Produce a focused patch or revised files. If there
is no execution environment, label the result changed-unverified. Supply exact
checks that should be run in the target project. Record assumptions about
missing dependencies and integration behavior.

**Do not:** say tests passed, imply the patch was applied elsewhere, or call a
required unrun check not-applicable.

## Existing changes and a failed baseline

**Request:** "Make this release branch shipshape without disturbing my work."

**Mode:** Improve.

Inspect the existing changes before editing. Record baseline failures. Fix only
within the authorized scope and review the diff afterward. Keep unrelated edits
and failures separate. If a required test remains failed, use Not ready even if
all new tests pass. Do not reset or overwrite the branch to make testing easier.

## A narrow request should stay narrow

**Request:** "Correct the spelling in this button label."

Without an explicit Shipshape invocation, use the ordinary narrow editing
workflow. Do not start a project-wide audit. With an explicit invocation and
this same limit, honor the limit; do not broaden the task.

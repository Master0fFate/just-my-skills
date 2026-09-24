# Verification and readiness

Contents: [Keep three kinds of state separate](#keep-three-kinds-of-state-separate) | [Record a useful check](#record-a-useful-check) | [Choose checks that match the claim](#choose-checks-that-match-the-claim) | [Compare before and after](#compare-before-and-after) | [Apply the readiness gate in order](#apply-the-readiness-gate-in-order)

## Keep three kinds of state separate

**Evidence** describes support for a claim:

| Label | Meaning |
| --- | --- |
| verified | Direct inspection, execution, measurement, or a suitable primary record supports the exact claim. |
| inferred | Reasoning suggests the claim, but direct confirmation is missing. |
| unknown | Available evidence does not support a conclusion. |

A verified source-code observation is not a verified runtime behavior. State the
level of the claim. A screenshot can verify visible text, not a hidden workflow.
A simulated user is not a research participant.

**Check results** describe acceptance tests:

| Result | Rule |
| --- | --- |
| pass | The check ran or was directly inspected, and its stated criterion was met. |
| fail | The check ran or was directly inspected, and its stated criterion was not met. |
| blocked | The check could not run because a specific prerequisite was unavailable. |
| not-tested | The check has not been performed. |
| not-applicable | The check is outside the milestone's actual requirements; record the reason. |

Do not convert blocked or not-tested into pass. Do not exclude a required check
as not-applicable merely because it is hard to run. Mark the check required or
optional before judging its result. Explain later changes to that designation.

**Action states** track work:

Use planned, in-progress, changed-unverified, verified, blocked, or deferred.
A patch can be complete as an output while the underlying fix stays unverified.
Only mark a fix verified when the relevant acceptance check passes. Keep the
finding open if the criterion fails or cannot be checked.

## Record a useful check

Record the check ID, linked criterion and finding, tested revision or artifact,
environment, method, expected result, actual result, status, and evidence
location. Include commands and exit codes when applicable. Keep logs concise
and remove secrets. For a manual review, state the material and property checked.

Example acceptance criterion: "With an empty input list, the summary command
returns zero and exits successfully instead of raising an exception."

Avoid criteria such as "make it clean" or "make it production-ready." Define the
observable result that those phrases require for this milestone.

## Choose checks that match the claim

**Software behavior:** use focused tests for the changed logic. Add integration
checks at relevant boundaries. Exercise a core workflow end to end when
possible. Use static checks, a build, and manual inspection as supporting
evidence, not interchangeable proof.

**Usability and appearance:** inspect the rendered experience. Perform the
specified task and recovery path. Use real representative users when the claim
requires user evidence. Keep a heuristic review distinct from a user test.

**Documents and designs:** check both source content and rendered output. Verify
links, calculations, references, consistency, and final layout as relevant.

**Data and experiments:** check data integrity and reproducibility. State the
dataset, method, settings, and uncertainty. Label hypothetical results clearly.

**Operations and viability:** test the process safely and check real outcome
records where available. Define an experiment when adoption evidence is missing.
Do not claim market validation from a quality review.

## Compare before and after

Capture a baseline when possible. Separate pre-existing failures from new ones.
After a change, rerun the relevant check and inspect adjacent behavior. Review
the final diff or artifact to ensure the change stayed within scope.

When a full test suite cannot run, report the checks that did run, the missing
coverage, and the effect on the verdict. A passing small subset does not become
a passing full suite. Do not attribute an unexplained failure to the environment.

When no baseline is possible, report the observed after-state without claiming
a measured improvement. Use comparable workloads and settings for performance
comparisons. Do not claim a percentage gain without valid before-and-after data.

If a change causes a regression, fix it or revert only that change when safe.
Do not discard the user's unrelated work. Report any unresolved regression.

## Apply the readiness gate in order

Judge the named milestone and inspected scope, not the entire future project.

1. **Not ready:** at least one required criterion fails, a milestone-blocking P0/P1 issue remains, or there is a known material regression that blocks the milestone.
2. **Insufficient evidence:** no known failure already establishes Not ready, but at least one required criterion is blocked, not-tested, or supported only by inference.
3. **Ready with limitations:** every required criterion passes and no milestone blocker remains, but nonblocking issues or explicit scope limits remain.
4. **Ready:** every required criterion passes, no milestone blocker remains, and the evidence supports readiness within the stated scope.

A justified not-applicable item is excluded from the required set, not counted
as a success. An empty required set does not justify Ready; define useful
milestone criteria or report Insufficient evidence.

A user-approved scope change may alter the milestone. Name the new scope and
state what was excluded. Never conceal a blocker through a weaker label.

Always separate **delivery or technical readiness** from **adoption evidence**.
For example, a tool can be ready for a limited pilot while willingness to use it
remains unknown. That is not proof that it is ready for a full commercial launch.

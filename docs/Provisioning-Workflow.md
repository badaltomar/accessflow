# Provisioning and Exception Workflow

## Standard fulfilment

1. Request is complete: identity, role, application, business justification, and approver are present.
2. Policy validation checks employment status and SoD conflicts.
3. Approved request becomes a provisioning task.
4. The connector carries out create, modify, grant, revoke, or disable action.
5. The service captures target response and marks the task Completed or Failed.
6. The analyst verifies completion, updates the request, and retains evidence.

## Failed provisioning runbook

| Check | Example action |
|---|---|
| Read the failure | Capture connector message, target system, identity, and task ID. |
| Validate prerequisites | Confirm valid identity, approval, account state, and requested role. |
| Retry safely | Retry only when the procedure allows it and duplicate access is prevented. |
| Record evidence | Add resolution notes, timestamp, and result to the request/audit trail. |
| Escalate | Send unresolved connector, target-system, or policy issues to L2/application support. |

## SLA example

Normal requests are completed within one business day; termination-related deprovisioning is treated as urgent. Exact SLA targets should always follow the organization’s policy.

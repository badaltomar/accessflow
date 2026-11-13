# IAM Functional Test Cases

| ID | Scenario | Steps | Expected result |
|---|---|---|---|
| TC-01 | Submit access request | Enter employee, target app, role, and justification; submit. | Request is pending approval and audit record is written. |
| TC-02 | Approve request | Open a pending request and select **Approve & queue**. | Status becomes In progress; queue count and audit trail update. |
| TC-03 | Reject request | Open a pending request and select **Reject**. | Request is failed/rejected and decision is recorded. |
| TC-04 | Retry exception | Open a failed request and select **Retry provisioning**. | Status changes to In progress and retry evidence appears. |
| TC-05 | Create joiner | Add employee identity from the Identities page. | Directory row appears with baseline app; JML audit event is created. |
| TC-06 | Search requests | Search by request ID, person, or application. | Only matching request rows display. |
| TC-07 | Search audit events | Search for action, identity, or actor. | Only matching audit records display. |
| TC-08 | SoD detection | Inspect Finance control-health / reviews view. | Payment Approver + Vendor Master Editor conflict appears as high risk. |
| TC-09 | Responsive layout | View at phone-width browser size. | Navigation and cards remain usable; tables scroll horizontally. |

# Compliance Controls

| Control objective | Control implementation | Evidence |
|---|---|---|
| Authorized access | Requests include approver, justification, application, and role. | Request detail and approval audit event. |
| Least privilege | Roles are defined in the access control matrix. | Role-to-application mapping. |
| Timely removal | Leaver flow disables and removes access. | Revocation event and completion status. |
| Accountability | Actions record actor, target, time, and outcome. | Audit trail. |
| SoD prevention | Conflicting Finance entitlements are flagged. | SoD alert and remediation queue. |
| Periodic certification | Managers review whether access remains required. | Q4 campaign completion indicator. |

## Evidence fields

For every access event, retain request ID, identity, system, role, approver, actioning analyst or service, timestamp, outcome, and any failure or resolution note.

## Access reviews

Managers or application owners should periodically certify their users’ access. Uncertified, inappropriate, or conflicting access is revoked or remediated and the decision is retained.

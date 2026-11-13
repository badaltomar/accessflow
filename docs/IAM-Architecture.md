# IAM Architecture

## Logical components

```text
HR source / analyst input → Identity repository → Access-request workflow
                                              ↓               ↓
                                       RBAC policy check → Manager approval
                                                              ↓
Audit store ← Verification ← Provisioning service → Target applications / directory
```

| Component | Responsibility |
|---|---|
| Identity repository | Holds employee attributes, status, manager, and application assignments. |
| Request workflow | Captures application, role, justification, priority, approver, and state. |
| Policy layer | Applies baseline RBAC and flags incompatible SoD access combinations. |
| Provisioning service | Creates, updates, disables, or removes simulated target-system access. |
| Audit store | Records actor, action, target, timestamp, result, and failure reason. |

## Implementation components

- **Browser workspace**: provides routed operations views and role-aware UI states.
- **Express API**: hosts the workspace and exposes the endpoints documented in `backend/API-Contract.md`.
- **Persistence layer**: stores identities, requests, entitlements, approvals, and audit events.
- **Authentication**: issues and validates access tokens for Analyst, Manager, and Application Owner roles; authorization is enforced server-side.

## Important security boundaries

The web client must not make authorization decisions on its own. In a production design, approval validation, SoD evaluation, audit recording, and connector credentials belong on the server. Secrets should be held in a secure vault, never in source control.

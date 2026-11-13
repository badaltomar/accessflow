# REST API Contract

The API is served by the Express application. It establishes the operations boundary between the browser workspace, persistence layer, and target-system integrations.

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/identities` | Search employee identities and access. |
| `POST` | `/api/identities` | Create a joiner identity. |
| `PATCH` | `/api/identities/:id` | Apply mover attributes or employment status. |
| `GET` | `/api/requests` | List/filter access requests. |
| `POST` | `/api/requests` | Submit an access request. |
| `POST` | `/api/requests/:id/approve` | Record an authorized approval and queue provisioning. |
| `POST` | `/api/requests/:id/reject` | Record a rejection with resolution note. |
| `POST` | `/api/provisioning/:id/retry` | Retry a failed task when permitted. |
| `GET` | `/api/audit-events` | Query audit evidence. |

All write endpoints should authenticate the actor, authorize the action, validate request data, evaluate policy and SoD controls, and append an audit event in a single server-side transaction where possible.

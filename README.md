# AccessFlow

AccessFlow is an identity governance and access-operations workspace for managing workforce identities, application access, fulfilment exceptions, reviews, and audit evidence.

## Capabilities

- Employee identity directory with department, manager, employment status, and assigned applications
- Joiner, Mover, and Leaver lifecycle management
- Access-request intake, authorization decisions, and request-status tracking
- Provisioning operations with completed, in-progress, and failed connector jobs
- Central audit trail for access requests, approvals, provisioning, revocation, and remediation
- Service-level queue indicators, access-review progress, and segregation-of-duties findings

## Architecture

```text
Identity source → AccessFlow API → Request and approval workflow
                                    ↓
                             Policy and SoD evaluation
                                    ↓
                         Provisioning service / connectors
                                    ↓
Target applications and directory services
                                    ↓
                           Audit and compliance evidence
```

The browser workspace is served by the Express application. The UI currently uses seeded operational records; the API contract and environment configuration establish the boundary for persistence and target-system integrations.

## Getting started

### Prerequisites

- Node.js 20 or later
- npm 10 or later

### Install and run

```bash
npm install
npm start
```

Open `http://localhost:3000`.

### Validate

```bash
npm run check
```

## Project structure

```text
frontend/       Browser application
backend/        Express server and API contract
docs/           Architecture, lifecycle, provisioning, and compliance controls
test-cases/     Functional test coverage
screenshots/    Product screenshots for repository documentation
```

## API surface

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Application health status |
| `GET` | `/api/identities` | Search identities |
| `POST` | `/api/identities` | Create an identity |
| `GET` | `/api/requests` | Retrieve access requests |
| `POST` | `/api/requests` | Submit an access request |
| `POST` | `/api/requests/:id/approve` | Approve and queue fulfilment |
| `POST` | `/api/requests/:id/reject` | Reject an access request |
| `GET` | `/api/audit-events` | Retrieve audit evidence |

## Deployment

Deploy through Vercel using the included [vercel.json](./vercel.json). It packages the browser workspace as static assets and exposes the Express API as Vercel functions. See [.env.example](./.env.example) for configuration and [backend/API-Contract.md](./backend/API-Contract.md) for integration requirements.

## Security considerations

- Authorization and policy checks must be evaluated server-side.
- Connector credentials and signing keys belong in a managed secrets store.
- Every write operation should record actor, action, target, result, and timestamp.
- Production deployment requires SSO, transport security, input validation, rate limiting, and persistent storage.

# Joiner, Mover, Leaver Workflow

## Joiner

1. HR creates an employee record with manager, department, designation, and start date.
2. The identity is created in the IAM repository.
3. Baseline RBAC access is calculated from department and job role.
4. Required approvals are validated; provisioning jobs create accounts or group memberships.
5. The analyst verifies fulfilment, updates the ticket, and records audit evidence.

## Mover

1. A trusted HR change identifies a department, role, or manager update.
2. Existing access is compared against the new role's access matrix.
3. Obsolete access is removed; new approved access is added.
4. The analyst checks for conflicts, verifies target-system results, and documents the change.

## Leaver

1. HR provides the end date or termination event.
2. The IAM process triggers high-priority deprovisioning.
3. Accounts are disabled and application access / group memberships are revoked.
4. Any failure is logged, retried according to procedure, and escalated if it risks the SLA.
5. Completion evidence is retained for audit.

## L1 decision rule

L1 follows the defined procedure, validates required approvals, updates the ticket, and escalates connector defects, ambiguous approvals, policy conflicts, and exception handling outside documented authority.

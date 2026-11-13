# Access Control Matrix

| Business role | Approved application access | Approval owner | Notes |
|---|---|---|---|
| Portfolio Analyst | Wealth Management Portal: Portfolio Analyst; Analytics: Reader | Wealth Management manager | Least-privilege reporting and portfolio access. |
| Financial Analyst | SAP Finance: Financial Analyst | Finance manager | May not receive Payment Approver. |
| HR Specialist | Workday: HR Specialist; HR Portal: Editor | HR manager | Access follows HR confidentiality policy. |
| Support Engineer | Service Desk: Agent; Directory: Helpdesk Operator | Technology manager + app owner | Elevated directory activity should be time-bound. |

## Segregation of duties example

The following combination is prohibited without documented exception approval:

| Entitlement A | Entitlement B | Risk | Control |
|---|---|---|---|
| SAP Finance: Payment Approver | Vendor Hub: Vendor Master Editor | One person could create or change a vendor and approve payment. | Prevent assignment, or require risk-owner exception and periodic review. |

## RBAC principles

- Grant a role, not an unmanaged individual permission, where possible.
- Grant only the minimum access needed for the job.
- Require manager or application-owner approval for access above baseline.
- Remove access that no longer maps to the current role or employment status.

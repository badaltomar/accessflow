const express = require("express");
const path = require("path");
const crypto = require("crypto");

const app = express();
const port = Number(process.env.PORT) || 3000;
const frontendPath = path.join(__dirname, "..", "frontend");

const identities = [
  { id: "EY-10482", name: "Rahul Sharma", department: "Wealth Management", designation: "Portfolio Analyst", manager: "Anita Verma", employmentStatus: "Active", applications: ["Wealth Portal", "Analytics"] },
  { id: "EY-10501", name: "Priya Shah", department: "Finance Operations", designation: "Senior Associate", manager: "Karan Mehta", employmentStatus: "Active", applications: ["SAP Finance", "Vendor Hub"] },
  { id: "EY-10517", name: "Vikram Rao", department: "Human Resources", designation: "HR Specialist", manager: "Neha Kapoor", employmentStatus: "Active", applications: ["Workday", "HR Portal"] }
];

const requests = [
  { id: "REQ-1024", identityId: "EY-10482", identityName: "Rahul Sharma", application: "Wealth Management Portal", role: "Portfolio Analyst", type: "New access", status: "Pending approval", priority: "High", approver: "Anita Verma", justification: "Required for daily financial reporting and portfolio review.", createdAt: "2026-11-13T04:44:00.000Z" },
  { id: "REQ-1023", identityId: "EY-10501", identityName: "Priya Shah", application: "SAP Finance", role: "Payment Approver", type: "Modify access", status: "In progress", priority: "High", approver: "Karan Mehta", justification: "Temporary coverage for month-end payment approvals.", createdAt: "2026-11-13T01:52:00.000Z" }
];

const auditEvents = [
  { id: "AUD-9001", action: "Access provisioned", target: "Rahul Sharma", actor: "Provisioning service", result: "Completed", createdAt: "2026-11-13T04:12:00.000Z" }
];

app.disable("x-powered-by");
app.use(express.json({ limit: "100kb" }));
app.use((req, res, next) => {
  res.set({
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  });
  next();
});

function recordEvent(action, target, actor, result) {
  auditEvents.unshift({ id: `AUD-${crypto.randomInt(1000, 10000)}`, action, target, actor, result, createdAt: new Date().toISOString() });
}

function requireText(value, field, res) {
  if (typeof value !== "string" || !value.trim()) {
    res.status(400).json({ error: `${field} is required.` });
    return false;
  }
  return true;
}

app.get(["/health", "/api/health"], (_req, res) => res.json({ status: "ok", service: "accessflow", timestamp: new Date().toISOString() }));

app.get("/api/identities", (req, res) => {
  const term = String(req.query.q || "").trim().toLowerCase();
  const results = term ? identities.filter((identity) => Object.values(identity).flat().join(" ").toLowerCase().includes(term)) : identities;
  res.json({ data: results, total: results.length });
});

app.post("/api/identities", (req, res) => {
  const { id, name, department, designation, manager } = req.body;
  if (![id, name, department, designation, manager].every((value, index) => requireText(value, ["id", "name", "department", "designation", "manager"][index], res))) return;
  if (identities.some((identity) => identity.id === id.trim())) return res.status(409).json({ error: "An identity with this employee ID already exists." });
  const identity = { id: id.trim(), name: name.trim(), department: department.trim(), designation: designation.trim(), manager: manager.trim(), employmentStatus: "Active", applications: [] };
  identities.unshift(identity);
  recordEvent("Identity created", identity.name, "Identity operations", "Completed");
  res.status(201).json({ data: identity });
});

app.get("/api/requests", (_req, res) => res.json({ data: requests, total: requests.length }));

app.post("/api/requests", (req, res) => {
  const { identityId, application, role, type, justification } = req.body;
  if (![identityId, application, role, type, justification].every((value, index) => requireText(value, ["identityId", "application", "role", "type", "justification"][index], res))) return;
  const identity = identities.find((item) => item.id === identityId.trim());
  if (!identity) return res.status(404).json({ error: "Identity not found." });
  const request = { id: `REQ-${crypto.randomInt(1000, 10000)}`, identityId: identity.id, identityName: identity.name, application: application.trim(), role: role.trim(), type: type.trim(), status: "Pending approval", priority: "Normal", approver: identity.manager, justification: justification.trim(), createdAt: new Date().toISOString() };
  requests.unshift(request);
  recordEvent("Access request submitted", request.identityName, "Identity operations", "Pending approval");
  res.status(201).json({ data: request });
});

app.post("/api/requests/:id/approve", (req, res) => {
  const request = requests.find((item) => item.id === req.params.id);
  if (!request) return res.status(404).json({ error: "Request not found." });
  if (request.status !== "Pending approval") return res.status(409).json({ error: "Only pending requests can be approved." });
  request.status = "In progress";
  recordEvent("Access request approved", request.identityName, req.body.actor || "Approver", "Queued for provisioning");
  res.json({ data: request });
});

app.post("/api/requests/:id/reject", (req, res) => {
  const request = requests.find((item) => item.id === req.params.id);
  if (!request) return res.status(404).json({ error: "Request not found." });
  if (request.status !== "Pending approval") return res.status(409).json({ error: "Only pending requests can be rejected." });
  request.status = "Rejected";
  recordEvent("Access request rejected", request.identityName, req.body.actor || "Approver", "Rejected");
  res.json({ data: request });
});

app.post("/api/provisioning/:id/retry", (req, res) => {
  const request = requests.find((item) => item.id === req.params.id);
  if (!request) return res.status(404).json({ error: "Provisioning task not found." });
  if (request.status !== "Failed") return res.status(409).json({ error: "Only failed provisioning tasks can be retried." });
  request.status = "In progress";
  recordEvent("Provisioning retry started", request.identityName, req.body.actor || "Identity operations", "In progress");
  res.json({ data: request });
});

app.get("/api/audit-events", (_req, res) => res.json({ data: auditEvents, total: auditEvents.length }));

app.use(express.static(frontendPath, { extensions: ["html"] }));
app.get("*", (_req, res) => res.sendFile(path.join(frontendPath, "index.html")));

if (require.main === module) {
  app.listen(port, "0.0.0.0", () => console.log(`AccessFlow listening on port ${port}`));
}

module.exports = app;

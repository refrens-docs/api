# Decisions

Append-only log. A later reversal is a new entry that supersedes — never edit an old one.

---

### D1 — Invoice `terms` array scoped to Invoices page only (2026-09-15)

**Context:** The new `terms` root-level array (label + list of term strings) is supported by
the API for all document types (invoices, quotes, orders), not just invoices.

**Options:**

- A. Document `terms` on the Invoices page only, for this update.
- B. Also update quotes/orders/other document doc pages in the same pass.

**Decision:** A — Invoices page only.

**Why & trade-off:** Keeps this update scoped to the 5 sections asked for. Other document
types get their `terms` docs in a later pass rather than growing this change unbounded.

**Refs:** docs/invoices.mdx

---

### D2 — New `additionalCharges`-based discount replaces the old `discount` object (2026-09-15)

**Context:** The Create Invoice response has always shown a root-level `discount` object
(`{"discountType": "PERCENTAGE"}`), but it was never documented as a request field. The new
invoice-level discount is set via the `additionalCharges` array (same shape as an additional
charge — `label`, `amount`, `type`, `multiplier` — with `multiplier: -1` for a discount vs `1`
for a charge).

**Options:**

- A. New `additionalCharges` approach replaces `discount` entirely in the docs.
- B. Document both, with `discount` marked legacy/back-compat.

**Decision:** A — replaces it.

**Why & trade-off:** `additionalCharges` is the one true way going forward; documenting a
second undocumented legacy path adds confusion for no benefit to API consumers.

**Refs:** docs/invoices.mdx

---

### D3 — EWB Generation page mirrors the existing localhost:3000 draft structure (2026-09-15)

**Context:** EWB generation is one underlying route
(`POST /businesses/:urlKey/invoices/:invoiceId/ewayBill?withoutIrn=true|false`), but a draft
page already exists (localhost:3000/generate-ewb/) split into 4 separate endpoint write-ups:
Generate EWB without IRN, Generate EWB on top of IRN, Update Vehicle Details, Update
Transporter Details.

**Options:**

- A. One endpoint doc with the `withoutIrn` query param explained.
- B. Match the existing draft: 4 separate endpoint write-ups.

**Decision:** B — match the existing draft.

**Why & trade-off:** The draft is already reviewed/working content; matching it avoids
throwing away existing work and keeps EWB consistent with what's already live in preview.
Update Vehicle Details and Update Transporter Details also silently regenerate the EWB —
there is no separate "regenerate" endpoint.

**Refs:** localhost:3000/generate-ewb/ (reference draft)

---

### D4 — Response examples for Inventory / Batches / Transactions are drafted, not captured live (2026-09-15)

**Context:** 13 of 14 new Inventory/Batches/Transactions endpoints have real request bodies
(from the "Refrens Inventory Mgmt" Postman collection) but no saved example response. Running
the requests live — including against the production environment's real auth token — was
requested but is out of bounds: no tool here can execute HTTP requests, and using a production
API secret/token, plus live create/update/delete/transfer-stock writes against real data, are
both actions Claude does not perform even on request.

**Options:**

- A. User runs the requests in Postman (has real prod credentials) and pastes responses back.
- B. Claude drafts response examples from request field shapes + the one detailed description
  available (batch-tracked manual adjustment), for human review afterward.

**Decision:** B — Claude drafts, human reviews after.

**Why & trade-off:** Unblocks drafting now instead of stalling on 13 manual round-trips.
Trade-off: drafted response shapes are a best guess until reviewed — flagged as open items
for the human to correct in one pass.

**Refs:** Postman collection "Refrens Inventory Mgmt" (47703615-2f1a86b3-806e-490e-acb3-3972ce359855)

---

### D5 — Plan-approval calls from tactics-board (2026-09-15)

**Context:** The tactics-board plan for this update flagged 4 open calls before implementation
could start: sidebar reordering, the `additionalCharges[].type` enum, whether EWB response
bodies exist, and whether to stop `docs/decisions.md` from publishing to the live site.

**Options & Decisions:**

- **Sidebar order** — Renumber existing pages (Invoices 5, Generate IRN 6, Generate EWB 7,
  Payment Updates 8, Leads 9, Clients 10, Pipelines 11, Inventory 12, Inventory Batches 13,
  Inventory Transactions 14) so Invoices → Generate IRN → Generate EWB read together as one
  workflow, instead of appending new pages at the bottom untouched. `sidebar_position` never
  changes a page's URL, so this is link-safe.
- **`additionalCharges[].type` enum** — `PERCENTAGE` / `FIXED_AMOUNT`. Not a guess — this is
  the real, confirmed API contract.
- **EWB response examples** — The localhost:3000 draft only has request tables, no captured
  responses. All 4 EWB endpoint responses will be drafted (same as the Inventory trio) and
  flagged for human review, not treated as verified fact.
- **`docs/decisions.md` publishing** — Excluded from the Docusaurus build (one-line
  `docusaurus.config.ts` change) so this internal log doesn't render publicly at `/decisions/`.

**Why & trade-off:** Renumbering costs one frontmatter line per file for a menu that actually
reads in workflow order. The type enum was a real fact worth blocking on rather than guessing,
since a wrong request-field enum breaks integrators' calls silently. Drafting EWB responses
keeps the same "draft now, human reviews" approach as D4, applied consistently across all new
pages instead of only the Inventory trio. Excluding decisions.md is a one-line fix for a real
bug the planner's spot-check caught — leaving it would ship an internal log to the public site.

**Refs:** tactics-board plan (agent a873eb70368800a06)

---

### D6 — Human review pass replaced drafted content; release as one PR (2026-09-18)

**Context:** Per D4/D5, 17 response examples across EWB Generation, Inventory, Inventory
Batches, and Inventory Transactions were drafted (best-guess) and flagged `human-review`. The
human then reviewed the live local preview over several rounds and supplied real captured data.

**What changed during review** (all applied directly, not re-litigated as separate decisions):

- Real response examples replaced drafted ones for: both EWB update endpoints (vehicle,
  transporter); Create/Update/Delete Inventory Item; List Inventory Items (real envelope +
  item shape, replacing the guessed one); Get/Create/Update Inventory Batch; List Inventory
  Batches; List Inventory Transactions; all 3 Create Inventory Transaction response variants
  (manual adjustment non-batch/batch-tracked, transfer stock).
- List Inventory Items and Create Inventory Item sections were replaced wholesale to match the
  human's own reference page — different field set than originally planned (added `tags`,
  `preferredVendor`, `registeredVendors`, ledger objects; dropped `images`/`originalImages`
  from the request body).
- Inventory Transactions consolidated from 5 separate endpoint write-ups (per the original
  plan) to 2 (List + Create, with Create's body/response split by `operationType`), matching
  the human's reference. Path param renamed `sku` → `inventory` for this page only.
- `additionalCharges[].type` enum confirmed as `PERCENTAGE`/`FIXED_AMOUNT` (matches D5).
- "Generate EWB on top of IRN" endpoint removed from the EWB page — not working as expected on
  the backend; to be re-added once fixed.
- Added a documented Base URL (`https://api.refrens.com`) to Getting Started — previously
  unstated anywhere in the docs.

**Still drafted, unconfirmed** (2 of the original 17 remain, both still carry the
`human-review` marker): "Generate EWB without IRN" response, and "Get Inventory by SKU"
response. Both were never corrected with real data — safe to ship marked as such, correct in a
follow-up.

**Decision:** Ship as **one PR** covering all of it — Invoices edit, EWB Generation, the 3
Inventory pages, `decisions.md`, and the `docusaurus.config.ts` exclude fix.

**Why & trade-off:** The original two-PR split (D5, verified-vs-drafted content) mattered when
most Inventory-trio content was still unverified. After this review pass, the overwhelming
majority of content is human-confirmed real data, so the risk the split was guarding against
mostly no longer applies. One PR is simpler to land for what's now a single coherent doc
update. The 2 remaining drafted responses are individually marked, so reviewers can still spot
them inside a combined PR.

**Refs:** local preview review, http://localhost:3010

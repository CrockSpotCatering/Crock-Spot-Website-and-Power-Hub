# Crock Spot — Resume Context

Durable, structured context for resuming work on **The Crock Spot** website + Power Hub CMS. Keep this short and accurate. When state changes (new tag, new route, moved env var, etc.), update this file in the same commit.

---

## Coordinates

- **Working directory:** `/Users/brettlechtenberg/dev/crockspot`
- **GitHub:** https://github.com/CrockSpotCatering/Crock-Spot-Website-and-Power-Hub
- **Vercel:** https://vercel.com/crockspotcaterings-projects
- **Live site:** https://www.thecrockspot.com
- **Power Hub CMS:** https://www.thecrockspot.com/power-hub

### Redirect domains (all → main site)
- thecrockspot.com → www.thecrockspot.com (Vercel)
- denversbestcatering.com → thecrockspot.com (GoDaddy forwarding)
- crockspotcatering.com → thecrockspot.com (GoDaddy forwarding)

---

## Session start checklist

1. `cd /Users/brettlechtenberg/dev/crockspot`
2. Read this file (`RESUME.md`), then `SESSION_LOG.md` for the latest session notes.
3. `git status` and `git pull` to make sure local is current.
4. Before any push, confirm GitHub identity:
   ```bash
   gh auth status
   gh auth switch -u CrockSpotCatering   # only if not already active
   ```
5. Vercel auto-deploys on push to `main`. Do **not** use Vercel CLI.

---

## Critical rules

- **NEVER work in `~/Documents/agent-girl/crockspot`.** That folder is under Google Drive sync (`~/Library/CloudStorage/GoogleDrive-...`) and corrupts git — `.git/index` accumulates `index 2`, `index 3`… duplicates and `git status` hangs. The only correct home is `~/dev/crockspot`. If you find yourself in the Documents copy, stop and switch.
- **Deploy only via `git push origin main`.** Never `vercel`, `vercel --prod`, or any Vercel CLI command — Vercel auto-deploys from GitHub.
- **GitHub account: `CrockSpotCatering` only.** Never push from `BoardChairIs1` or `BrettLechtenbrerg`. Run `gh auth switch -u CrockSpotCatering` before pushing if unsure.
- **Vercel account: `crockspotcaterings-projects`** (not `bretts-projects-*`).
- **Don't paste passwords into chat.** `gh` and `vercel` are already authenticated on this machine. Power Hub credentials live in `content/credentials.json` and are managed via the Power Hub Settings page.

---

## Tech stack

- Next.js 16 (App Router) + React + TypeScript
- Tailwind CSS 3.4 (**not v4**) + Framer Motion + lucide-react
- JSON-powered CMS in `/content/*.json`
- GitHub API for Power Hub media storage
- `unpdf` (PDF) + `mammoth` (DOCX) for AI Assist document parsing
- GoHighLevel webhooks for contact / lead forms
- Vercel auto-deploy from GitHub `main`

---

## Brand

- **Tagline:** "Let Us Crock Your World"
- **Founders:** Steven, Mandy & Peter Edholm (since 2010, Denver)
- **Focus:** Corporate events, weddings, buffet catering (food truck is secondary)
- **Sister company:** The Spot Cafe (RiNo District) — own palette: Navy `#1B3A5F` + Coral `#E8704A`

### Colors (main site)
| Token | Hex | Use |
|---|---|---|
| Orange | `#F49220` | Primary CTA |
| Maroon | `#8C2D2E` | Secondary |
| Green | `#667934` | Dietary / success |
| Purple | `#614B8A` | Accent |
| Dark Purple | `#2F2744` | Dark backgrounds |
| Yellow | `#F0DB9C` | Highlights |

Voice: warm, professional, no hype.

---

## Site structure

### Public routes
- `/` (home) · `/about` · `/catering` · `/menus` · `/contact`
- `/the-spot` (sister company)
- `/government-capabilities` · `/community-partners`
- `/privacy` · `/terms`

### CMS
- `/power-hub` (login)
- `/power-hub/dashboard/events` — Event Intake Sheets (list, edit, print PDF)
- `/power-hub/dashboard/content` — JSON content editor
- `/power-hub/dashboard/media` — image library (GitHub-backed)
- `/power-hub/dashboard/calendar` — calendar view (currently demo data only)
- `/power-hub/dashboard/ai` — AI Assist (PDF / DOCX upload)
- `/power-hub/dashboard/settings` — AI providers, credentials

### API routes (`app/api/power-hub/*`)
- `content` (read/write JSON) · `events` (CRUD intake sheets) · `documents` · `media` · `upload` · `ai` · `parse-document` · `credentials`

---

## Content files (`/content/*.json`)

| File | Controls |
|---|---|
| `home.json` | Homepage hero, services, benefits |
| `about.json` | Founders, timeline, values, awards |
| `catering.json` | Catering options, event types, process |
| `menus.json` | Bases, proteins, sauces, toppers, desserts |
| `contact.json` | Contact form + locations |
| `shared.json` | Testimonials, FAQ |
| `government-capabilities.json` | Vendor credentials, past performance |
| `community-partners.json` | Community partnerships |
| `the-spot.json` | The Spot Cafe page |
| `footer.json` | Footer (company, links, social, awards) |
| `privacy.json` · `terms.json` | Legal pages |
| `documents.json` | AI Assist brand docs |
| `events.json` | Event intake sheets (one per booked event) |
| `settings.json` | AI provider + API keys |
| `credentials.json` | Power Hub login (edit via Settings UI) |

All page components import directly from these files. Editing a JSON file = editing the page.

---

## Backups & rollback

- **Source of truth:** `origin/main` on GitHub.
- **Local working tree:** `~/dev/crockspot` only.
- **Old corrupted copy:** `~/Documents/agent-girl/crockspot` (do not touch; should be renamed to `crockspot.OLD-DO-NOT-USE` and ignored).
- **Rollback tags:**
  - `v1.0-stable` (May 26, 2026) — first stable release: site is live on thecrockspot.com, Power Hub CMS shipped, Event Intake Sheets feature complete (list / edit / print PDF / GitHub-backed storage), 3 seeded `[EXAMPLE]` events demonstrate the lifecycle.
  - Restore with: `git checkout v1.0-stable` (read-only) or `git reset --hard v1.0-stable` (destructive).


---

## Active workstreams (things you may pick up)

- **Power Hub Events polish** — CSV export of all events, link the existing `/calendar` tab into real events data (currently demo `useState` only), notification when a new event is created.
- **Replace remaining Unsplash hero images** with real client photos.
- **Add partner logos** to `/community-partners`.
- **Re-enable GoHighLevel notification actions** for real leads (currently scoped down).
- **Tracking:** Google Analytics / conversion pixels — not yet installed.
- **Online ordering** integration — under consideration, not started.
- **Team onboarding** — the 3 `[EXAMPLE]` events in `content/events.json` should be deleted by the team once they're comfortable with the feature.

---

## Reusable patterns (for future docs)

- JSON-as-CMS: every page imports from `content/*.json`; Power Hub edits the same files via GitHub API → triggers Vercel rebuild.
- Power Hub media: images live in the GitHub repo under `public/` and are managed through the GitHub Contents API from the CMS.
- Power Hub records (Events): the same JSON-as-CMS pattern scales to record-style data. `content/events.json` holds an array, `app/api/power-hub/events/route.ts` exposes full CRUD via the GitHub Contents API (sha-checked updates, automatic commit history). No DB needed.
- Print-to-PDF without a library: render a separate `hidden print:block` view containing the same data as plain text — inputs/textareas can't expand on print, so a dedicated print view is the reliable cross-browser path. See `EventSheetPrintView` in `components/power-hub/EventSheetForm.tsx`.
- Hidden routes: block in `public/robots.txt`. If a route needs full noindex headers, add a per-route `layout.tsx` with `robots: { index: false }` in `metadata` (same pattern TSAI uses for hidden workshops).

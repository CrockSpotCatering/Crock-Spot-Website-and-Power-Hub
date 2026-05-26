# The Crock Spot - Project Instructions

## Project Overview
The Crock Spot is Denver's premier event caterer. This is a Next.js 16 website with a JSON-powered CMS.

## CRITICAL: Read First
Before making any changes, read these files in order:
1. `RESUME.md` - Durable project context (coordinates, rules, structure, active workstreams) ← **start here**
2. `SESSION_LOG.md` - Recent work and current status
3. `DEPLOYMENT.md` - Deployment procedures

`RESTART_PROMPT.md` and the older docs are kept for history but `RESUME.md` is the source of truth.

## Key Rules

### Deployment
```
🚫 NEVER use Vercel CLI (vercel, vercel --prod)
✅ ONLY deploy via: git push origin main → Vercel auto-deploys
```

### GitHub Account
```
🚫 NEVER use BoardChairIs1 or BrettLechtenbrerg accounts
✅ ONLY use CrockSpotCatering account
✅ Run: gh auth switch -u CrockSpotCatering
```

## Project Location
```bash
cd /Users/brettlechtenberg/dev/crockspot
```

🚫 **NEVER work in `~/Documents/agent-girl/crockspot`** — that folder is under Google Drive sync and corrupts `.git` (duplicate `index 2`, `index 3`… files, `git status` hangs). The only correct home is `~/dev/crockspot`.

## Project Structure
- `/app/` - Next.js pages and API routes
- `/content/*.json` - CMS content (edit here or via Power Hub)
- `/components/` - React components
- `/public/` - Static assets

## Quick Commands
```bash
cd /Users/brettlechtenberg/dev/crockspot
npm run dev          # Dev server at localhost:3000
npm run build        # Build for production
git push origin main # Deploy to Vercel (auto-deploy)
```

## Business Focus
- **Primary:** Corporate events, weddings, buffet catering
- **Secondary:** Food truck option for outdoor events
- **Tagline:** "Let Us Crock Your World"

## URLs (LIVE as of April 1, 2026!)
- **Live Site:** https://www.thecrockspot.com
- **Power Hub CMS:** https://www.thecrockspot.com/power-hub
- **GitHub:** https://github.com/CrockSpotCatering/Crock-Spot-Website-and-Power-Hub

### Redirect Domains (all point to main site)
- thecrockspot.com → www.thecrockspot.com (Vercel)
- denversbestcatering.com → thecrockspot.com (GoDaddy forwarding)
- crockspotcatering.com → thecrockspot.com (GoDaddy forwarding)

## Power Hub CMS
- **Login:** `crockspot` / `crockspot2026`
- **Content Editor:** Edit all JSON content files
- **Media Library:** Upload/manage images (GitHub storage)
- **AI Assist:** AI writing with PDF/Word document upload

## Tech Stack
- Next.js 16 with App Router
- Tailwind CSS 3.4
- TypeScript
- `unpdf` for PDF parsing (serverless-compatible)
- `mammoth` for DOCX parsing
- Vercel auto-deploy via GitHub

## General Guidelines

### Communication Style
- Be concise and direct
- Match response length to question complexity
- Professional yet approachable
- Ask clarifying questions rather than assuming

### Problem-Solving
1. Understand the full context before answering
2. Break down complex questions into manageable parts
3. Provide practical, actionable solutions
4. Offer alternatives when appropriate

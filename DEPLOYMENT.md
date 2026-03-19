# Crock Spot Deployment Guide

## CRITICAL DEPLOYMENT RULES

```
┌─────────────────────────────────────────────────────────────────────┐
│  🚫 NEVER USE VERCEL CLI (vercel, vercel --prod, etc.)              │
│  ✅ ONLY deploy via Vercel Dashboard + GitHub Integration          │
│                                                                     │
│  This project uses AUTO-DEPLOY: Push to GitHub → Vercel deploys    │
│  No CLI needed. No CLI allowed. Ever.                               │
└─────────────────────────────────────────────────────────────────────┘
```

## Current Status (March 19, 2026)

| Service | URL | Status |
|---------|-----|--------|
| **Live Site** | https://crock-spot-website-and-power-hub.vercel.app | ✅ LIVE |
| **GitHub** | https://github.com/CrockSpotCatering/Crock-Spot-Website-and-Power-Hub | ✅ Connected |
| **Vercel Dashboard** | https://vercel.com/crockspotcaterings-projects | ✅ Deployed |
| **Local Path** | `/Users/brettlechtenberg/Documents/agent-girl/crockspot` | ✅ Ready |

> **Auto-Deploy Active:** Push to GitHub → Vercel deploys automatically!

## Project Structure

```
crockspot/
├── app/
│   ├── page.tsx              # Home (uses home.json)
│   ├── layout.tsx            # Root layout + SEO
│   ├── globals.css           # Global styles
│   ├── about/page.tsx        # About (uses about.json)
│   ├── catering/page.tsx     # Catering (uses catering.json)
│   ├── menus/page.tsx        # Menu (uses menus.json)
│   ├── contact/page.tsx      # Contact (uses contact.json)
│   ├── government-capabilities/page.tsx
│   ├── community-partners/page.tsx
│   ├── the-spot/page.tsx     # The Spot Cafe sister company
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   ├── power-hub/            # CMS Dashboard
│   │   ├── page.tsx          # Login
│   │   └── dashboard/        # Dashboard pages
│   └── api/power-hub/        # API Routes
│       ├── content/route.ts  # JSON read/write
│       ├── documents/route.ts # Brand document storage
│       ├── media/route.ts    # Image listing
│       ├── upload/route.ts   # Image upload/delete
│       ├── ai/route.ts       # AI generation
│       └── parse-document/route.ts  # PDF/Word parsing
├── components/
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── CTASection.tsx
│   ├── ContactForm.tsx
│   ├── FAQ.tsx               # Uses shared.json
│   ├── Testimonials.tsx      # Uses shared.json
│   └── power-hub/            # CMS components
├── content/                  # JSON Content Files (13 files)
│   ├── home.json
│   ├── about.json
│   ├── catering.json
│   ├── menus.json
│   ├── contact.json
│   ├── shared.json
│   ├── government-capabilities.json
│   ├── community-partners.json
│   ├── the-spot.json
│   ├── footer.json
│   ├── privacy.json
│   ├── terms.json
│   └── documents.json        # AI Assist brand documents
├── public/images/
│   └── uploads/              # User-uploaded images
├── CLAUDE.md
├── DEPLOYMENT.md
├── README.md
├── RESTART_PROMPT.md
├── SESSION_LOG.md
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## Power Hub CMS

| URL | Feature |
|-----|---------|
| `/power-hub` | Login page |
| `/power-hub/dashboard` | Main dashboard |
| `/power-hub/dashboard/content` | Edit page content (JSON) |
| `/power-hub/dashboard/media` | Upload/manage images |
| `/power-hub/dashboard/ai` | AI writing assistant (PDF/DOCX upload) |
| `/power-hub/dashboard/settings` | Configuration |

**Login:** `crockspot` / `crockspot2026`

## Quick Commands

```bash
# Navigate to project
cd /Users/brettlechtenberg/Documents/agent-girl/crockspot

# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production (local test only)
npm run build

# Push to GitHub → This auto-deploys to Vercel!
git add .
git commit -m "Your message"
git push origin main
```

## How Deployment Works (GitHub Integration)

1. You push code to GitHub
2. Vercel automatically detects the push
3. Vercel builds and deploys automatically
4. Done! No CLI commands needed

## Account Credentials

### GitHub
- **Username:** CrockSpotCatering
- **Email:** CrockSpotCatering@gmail.com
- **Password:** CrockSpotCateringIs#1
- **Repo:** https://github.com/CrockSpotCatering/Crock-Spot-Website-and-Power-Hub

> **Note:** GitHub requires a Personal Access Token (PAT) for git push. Create one at: https://github.com/settings/tokens/new (select `repo` scope)

### Vercel (CrockSpot Account - NOT Brett's personal!)
- **Account:** crockspotcaterings-projects
- **Dashboard:** https://vercel.com/crockspotcaterings-projects
- **Project:** Crock-Spot-Website-and-Power-Hub
- **Live URL:** https://crock-spot-website-and-power-hub.vercel.app

> 🚫 **NEVER use Vercel CLI** - Always deploy via GitHub integration only!

### Supabase (for future forms)
- **Email:** CrockSpotCatering@gmail.com
- **Password:** CrockSpotCateringIs#1
- **Project URL:** https://ptmcisouwmkqiowmxttq.supabase.co

## Environment Variables (Vercel)

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `GITHUB_TOKEN` | GitHub API access for image storage |

## Tech Stack

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | ^16.0.1 | Framework |
| `react` | ^19.2.0 | UI Library |
| `unpdf` | ^1.4.0 | PDF parsing (serverless-compatible) |
| `mammoth` | ^1.12.0 | DOCX parsing |
| `framer-motion` | ^12.23.24 | Animations |
| `lucide-react` | ^0.577.0 | Icons |
| `tailwindcss` | ^3.4.18 | Styling |

## Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Orange | `#F49220` | Primary accent |
| Maroon | `#8C2D2E` | Secondary |
| Green | `#667934` | Success/dietary |
| Purple | `#614B8A` | Accent |
| Dark Purple | `#2F2744` | Dark backgrounds |
| Yellow | `#F0DB9C` | Highlights |

## Crock Spot Contact Info

- **Email:** steven@thecrockspot.com
- **Website:** thecrockspot.com
- **Facebook:** facebook.com/104226646277525
- **Instagram:** @thecrockspot
- **Founded:** 2010 by Steven & Mandy
- **Location:** Denver, Colorado

---

*Let Us Crock Your World!*

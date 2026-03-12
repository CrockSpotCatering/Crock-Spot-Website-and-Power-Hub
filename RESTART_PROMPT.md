# 🍲 CROCK SPOT - Ultimate Restart Prompt

**Copy and paste this entire prompt into a new Claude session:**

---

## Project: The Crock Spot Website & Power Hub

I'm working on **The Crock Spot** website & CMS - a food truck catering company in Denver, Colorado.

### 📍 Project Location
```
/Users/brettlechtenberg/Documents/agent-girl/crockspot1
```

### 🔗 URLs
- **Live Site:** https://crock-spot-website-and-power-hub.vercel.app
- **Power Hub CMS:** https://crock-spot-website-and-power-hub.vercel.app/power-hub
- **GitHub:** https://github.com/CrockSpotCatering/Crock-Spot-Website-and-Power-Hub
- **Vercel Dashboard:** https://vercel.com/crockspotcaterings-projects

### 🛠️ Tech Stack
- Next.js 16 with App Router
- Tailwind CSS 3.4
- Framer Motion
- TypeScript
- JSON-powered CMS (content stored in `/content/*.json`)
- GitHub API for image storage
- pdf-parse + mammoth for document parsing
- Vercel deployment (via GitHub integration)

### 🔐 Power Hub CMS
| URL | Feature |
|-----|---------|
| `/power-hub` | Login (`crockspot` / `letusrock2024`) |
| `/power-hub/dashboard/content` | Edit page content (JSON files) |
| `/power-hub/dashboard/media` | Upload/manage images |
| `/power-hub/dashboard/ai` | AI writing (supports PDF/Word upload) |

### 📄 Content JSON Files
All pages read from JSON in `/content/`:
- `home.json` - Homepage content
- `about.json` - About page
- `catering.json` - Catering services
- `menus.json` - Menu items
- `contact.json` - Contact info
- `shared.json` - Testimonials, FAQ

### ⚠️ CRITICAL DEPLOYMENT RULES
```
┌─────────────────────────────────────────────────────────────────────┐
│  🚫 NEVER USE VERCEL CLI (vercel, vercel --prod, etc.)              │
│  ✅ ONLY deploy via Vercel Dashboard + GitHub Integration          │
│                                                                     │
│  Push to GitHub → Vercel auto-deploys. No CLI. Ever.                │
└─────────────────────────────────────────────────────────────────────┘
```

### 📁 Key Files
Read these first for context:
1. `DEPLOYMENT.md` - Full deployment guide, credentials, and status
2. `README.md` - Project overview and structure

### 🔑 Account Info (Keep Separate!)
| Service | Account | NOT This |
|---------|---------|----------|
| **GitHub** | CrockSpotCatering | ❌ Not Brett's personal |
| **Vercel** | crockspotcaterings-projects | ❌ Not bretts-projects |
| **Supabase** | CrockSpotCatering@gmail.com | ❌ Not Brett's personal |

> ⚠️ GitHub requires a **classic Personal Access Token** for git push. Create at: https://github.com/settings/tokens/new (select `repo` scope)

### 🎨 Brand Colors
- Orange: #F49220 (primary)
- Maroon: #8C2D2E
- Green: #667934
- Purple: #614B8A
- Dark Purple: #2F2744

### 📋 Current Status (March 12, 2026)
- ✅ Website fully built with all pages
- ✅ Power Hub CMS complete (Content, Media, AI Assist)
- ✅ JSON content system wired to all pages
- ✅ AI Assist supports PDF/Word document upload
- ✅ Media Library with GitHub storage
- ✅ Pushed to GitHub (local commits ready)
- ✅ Deployed to correct Vercel account (auto-deploy enabled)
- ⏳ Need CrockSpotCatering GitHub credentials to push latest

### 🚀 Quick Commands (NO VERCEL CLI!)
```bash
cd /Users/brettlechtenberg/Documents/agent-girl/crockspot1
npm run dev        # Start dev server
npm run build      # Local build test

# Deploy = push to GitHub (auto-deploys via Vercel integration)
git add . && git commit -m "message" && git push origin main
```

### 📞 Business Info
- **Owners:** Steven & Mandy
- **Founded:** 2010
- **Email:** steven@thecrockspot.com
- **Tagline:** "Let Us Crock Your World"

---

**What I want to work on today:**

[DESCRIBE YOUR TASK HERE]

---

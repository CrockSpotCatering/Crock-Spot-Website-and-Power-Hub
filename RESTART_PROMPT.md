# 🍲 CROCK SPOT - Ultimate Restart Prompt

**Copy and paste this entire prompt into a new Claude session:**

---

## Project: The Crock Spot Website & Power Hub

I'm working on **The Crock Spot** website & CMS - a food truck catering company in Denver, Colorado.

### 📍 FIRST: Read These Files
```bash
cd /Users/brettlechtenberg/Documents/agent-girl/crockspot1
```
Then read in this order:
1. `SESSION_LOG.md` - What was done, what's pending
2. `README.md` - Full project overview
3. `DEPLOYMENT.md` - Deployment guide & credentials

### 🔗 URLs
| Resource | URL |
|----------|-----|
| **Live Site** | https://crock-spot-website-and-power-hub.vercel.app |
| **Power Hub CMS** | https://crock-spot-website-and-power-hub.vercel.app/power-hub |
| **GitHub Repo** | https://github.com/CrockSpotCatering/Crock-Spot-Website-and-Power-Hub |
| **Vercel Dashboard** | https://vercel.com/crockspotcaterings-projects |

### 🛠️ Tech Stack
- Next.js 16 with App Router
- Tailwind CSS 3.4 + Framer Motion
- TypeScript
- JSON-powered CMS (`/content/*.json`)
- GitHub API for image storage
- pdf-parse + mammoth for document parsing
- Vercel auto-deploy via GitHub

### 🔐 Power Hub CMS
| URL | Feature | Login |
|-----|---------|-------|
| `/power-hub` | CMS Login | `crockspot` / `letusrock2024` |
| `/power-hub/dashboard/content` | Edit JSON content | |
| `/power-hub/dashboard/media` | Upload/manage images | |
| `/power-hub/dashboard/ai` | AI writing (PDF/Word) | |

### 📄 JSON Content System
Pages import from `/content/*.json`:
- `home.json`, `about.json`, `catering.json`, `menus.json`, `contact.json`, `shared.json`

Edit JSON in Power Hub → Changes appear on live site.

### ⚠️ CRITICAL RULES
```
┌─────────────────────────────────────────────────────────────────────┐
│  🚫 NEVER USE VERCEL CLI (vercel, vercel --prod, etc.)              │
│  ✅ ONLY deploy via GitHub push → Vercel auto-deploys              │
│                                                                     │
│  🚫 NEVER use BoardChairIs1 or Murray Chamber accounts              │
│  ✅ ONLY use CrockSpotCatering GitHub account                       │
└─────────────────────────────────────────────────────────────────────┘
```

### 🔑 Accounts (KEEP SEPARATE!)
| Service | Use This | NOT This |
|---------|----------|----------|
| **GitHub** | CrockSpotCatering | ❌ BoardChairIs1, BrettLechtenbrerg |
| **Vercel** | crockspotcaterings-projects | ❌ bretts-projects |
| **gh CLI** | `gh auth switch -u CrockSpotCatering` | |

### 🎨 Brand Colors
- Orange: `#F49220` (primary)
- Maroon: `#8C2D2E`
- Green: `#667934`
- Purple: `#614B8A`
- Dark Purple: `#2F2744`

### 📋 Current Status (March 12, 2026)
- ✅ Website fully built with all pages
- ✅ Power Hub CMS complete (Content, Media, AI Assist)
- ✅ JSON content system wired to all pages
- ✅ All pages import from JSON files
- ✅ AI Assist supports PDF/Word document upload
- ✅ Media Library with GitHub storage
- ✅ All commits pushed to GitHub (CrockSpotCatering account)
- ✅ Vercel auto-deploying from GitHub
- ✅ Documentation updated (README, DEPLOYMENT, SESSION_LOG)

### 🐛 Known Issues
- PDF upload in AI Assist may have issues (needs testing on live site)

### 🚀 Quick Commands
```bash
cd /Users/brettlechtenberg/Documents/agent-girl/crockspot1
npm run dev        # Start dev server (localhost:3000)
npm run build      # Build for production

# Before pushing, ensure correct GitHub account:
gh auth switch -u CrockSpotCatering

# Deploy = push to GitHub
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

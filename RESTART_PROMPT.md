# 🍲 CROCK SPOT - Ultimate Restart Prompt

**Copy and paste this entire prompt into a new Claude session:**

---

## Project: The Crock Spot Website & Power Hub

I'm working on **The Crock Spot** website & CMS - Denver's premier event caterer for corporate events, weddings, and private gatherings.

### 📍 FIRST: Read These Files
```bash
cd /Users/brettlechtenberg/Documents/agent-girl/crockspot
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
| `/power-hub` | CMS Login | `crockspot` / `crockspot2026` |
| `/power-hub/dashboard/content` | Edit JSON content | |
| `/power-hub/dashboard/media` | Upload/manage images | |
| `/power-hub/dashboard/ai` | AI writing (PDF/Word) | |

### 📄 JSON Content Files
All pages import from `/content/*.json`:
| File | Purpose |
|------|---------|
| `home.json` | Homepage - hero, services, benefits, stats |
| `about.json` | Founders, timeline, values, awards, team |
| `catering.json` | Catering options, event types, process |
| `menus.json` | Full menu - appetizers, bases, proteins, sauces, toppers, desserts |
| `contact.json` | Contact form, locations |
| `shared.json` | Testimonials, FAQ |
| `government-capabilities.json` | Vendor credentials, military contracts |
| `community-partners.json` | Community partnerships |
| `the-spot.json` | The Spot Café sister company |
| `footer.json` | Footer content (company, links, social, awards) |

### 📱 Mobile Optimization (Google 2025)
✅ Implemented:
- 48px minimum touch targets
- Full-width buttons on mobile (min-h-[56px])
- `viewportFit: cover` for notched devices
- `interactiveWidget: resizes-content` for keyboard
- 16px base font (prevents iOS zoom)
- `text-wrap: balance/pretty` for typography
- PWA manifest.json
- Preconnect hints for fonts/images
- Safe area inset utilities
- Responsive grids (2-col on mobile, 4-col on desktop)

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
- Orange: `#F49220` (primary CTA)
- Maroon: `#8C2D2E`
- Green: `#667934`
- Purple: `#614B8A`
- Dark Purple: `#2F2744` (backgrounds)

### 📋 Current Status (March 17, 2026 - End of Session)
**Website:**
- ✅ All pages complete and styled
- ✅ Corporate catering focus (not food trucks)
- ✅ Mobile optimized per Google 2025 standards (comprehensive pass done)
- ✅ "The Spot" sister company page added
- ✅ Full menu with rich descriptions
- ✅ Government capabilities with vendor credentials

**CMS:**
- ✅ Power Hub CMS complete
- ✅ Content editor, Media Library, AI Assist
- ✅ ALL pages wired to JSON (including Footer, The Spot, Government, Community)
- ✅ Login: `crockspot` / `crockspot2026`

**Infrastructure:**
- ✅ All changes committed and pushed
- ✅ Vercel auto-deploying from GitHub
- ✅ GitHub CLI active account: CrockSpotCatering
- ✅ Documentation up to date

### 📂 Project Structure
```
crockspot/
├── app/                    # Next.js pages
│   ├── page.tsx           # Homepage
│   ├── about/             # About page
│   ├── catering/          # Catering page
│   ├── menus/             # Menu page
│   ├── contact/           # Contact page
│   ├── the-spot/          # The Spot Café page
│   ├── government-capabilities/
│   ├── community-partners/
│   ├── power-hub/         # CMS dashboard
│   └── api/               # API routes
├── components/            # React components
├── content/               # JSON content files (12 files)
├── public/                # Static assets
├── SESSION_LOG.md         # What was done
├── RESTART_PROMPT.md      # This file
├── DEPLOYMENT.md          # Deploy guide
└── README.md              # Project overview
```

### 🚀 Quick Commands
```bash
cd /Users/brettlechtenberg/Documents/agent-girl/crockspot
npm run dev        # Start dev server (localhost:3000)
npm run build      # Build for production

# Before pushing, ensure correct GitHub account:
gh auth switch -u CrockSpotCatering

# Deploy = push to GitHub
git add . && git commit -m "message" && git push origin main
```

### 📞 Business Info
- **Business:** The Crock Spot (Denver food truck catering since 2010)
- **Owners:** Steven & Mandy (+ Peter, partner)
- **Email:** steven@thecrockspot.com
- **Tagline:** "Let Us Crock Your World"
- **Focus:** Corporate events, weddings, buffet catering
- **Awards:** Best Food Truck (5280), Best Meals on Wheels (Westword), 50 Coolest Small Businesses (Business Insider)
- **Sister Company:** The Spot Café (Mandy Smith, RiNo District corporate catering)

---

**What I want to work on today:**

[DESCRIBE YOUR TASK HERE]

---

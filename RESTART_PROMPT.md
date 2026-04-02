# CROCK SPOT - Ultimate Restart Prompt

**Copy and paste this entire prompt into a new Claude session:**

---

## Project: The Crock Spot Website & Power Hub

I'm working on **The Crock Spot** website & CMS - Denver's premier event caterer for corporate events, weddings, and private gatherings.

### FIRST: Read These Files
```bash
cd /Users/brettlechtenberg/Documents/agent-girl/crockspot
```
Then read in this order:
1. `SESSION_LOG.md` - What was done, what's pending
2. `README.md` - Full project overview
3. `DEPLOYMENT.md` - Deployment guide & credentials

### URLs
| Resource | URL |
|----------|-----|
| **Live Site** | https://www.thecrockspot.com |
| **Power Hub CMS** | https://www.thecrockspot.com/power-hub |
| **GitHub Repo** | https://github.com/CrockSpotCatering/Crock-Spot-Website-and-Power-Hub |
| **Vercel Dashboard** | https://vercel.com/crockspotcaterings-projects |

### Domain Configuration (April 1, 2026)
| Domain | Method | Status |
|--------|--------|--------|
| **www.thecrockspot.com** | Vercel + GoDaddy DNS | ✅ Primary Site |
| **thecrockspot.com** | Vercel redirect | ✅ → www |
| **denversbestcatering.com** | GoDaddy forwarding | ✅ → main site |
| **crockspotcatering.com** | GoDaddy forwarding | ✅ → main site |

### Tech Stack
- Next.js 16 with App Router
- Tailwind CSS 3.4 + Framer Motion
- TypeScript
- JSON-powered CMS (`/content/*.json`)
- GitHub API for image storage
- `unpdf` for PDF parsing (serverless-compatible)
- `mammoth` for DOCX parsing
- Vercel auto-deploy via GitHub

### Power Hub CMS
| URL | Feature | Login |
|-----|---------|-------|
| `/power-hub` | CMS Login | `crockspot` / `crockspot2026` |
| `/power-hub/dashboard/content` | Edit JSON content | |
| `/power-hub/dashboard/media` | Upload/manage images | |
| `/power-hub/dashboard/ai` | AI writing (PDF/Word upload) | |

### JSON Content Files (15 total)
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
| `the-spot.json` | The Spot Cafe sister company |
| `footer.json` | Footer content (company, links, social, awards) |
| `privacy.json` | Privacy policy |
| `terms.json` | Terms of service |
| `documents.json` | AI Assist brand documents |
| `settings.json` | AI provider & API keys |
| `credentials.json` | Power Hub login credentials |

### Mobile Optimization (Google 2025)
Implemented:
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

### CRITICAL RULES
```
┌─────────────────────────────────────────────────────────────────────┐
│  🚫 NEVER USE VERCEL CLI (vercel, vercel --prod, etc.)              │
│  ✅ ONLY deploy via GitHub push → Vercel auto-deploys              │
│                                                                     │
│  🚫 NEVER use BoardChairIs1 or Murray Chamber accounts              │
│  ✅ ONLY use CrockSpotCatering GitHub account                       │
└─────────────────────────────────────────────────────────────────────┘
```

### Accounts (KEEP SEPARATE!)
| Service | Use This | NOT This |
|---------|----------|----------|
| **GitHub** | CrockSpotCatering | BoardChairIs1, BrettLechtenbrerg |
| **Vercel** | crockspotcaterings-projects | bretts-projects |
| **gh CLI** | `gh auth switch -u CrockSpotCatering` | |

### Brand Colors
- Orange: `#F49220` (primary CTA)
- Maroon: `#8C2D2E`
- Green: `#667934`
- Purple: `#614B8A`
- Dark Purple: `#2F2744` (backgrounds)

### Current Status (April 1, 2026)

**🎉 SITE IS LIVE!**
- **Primary Domain:** https://www.thecrockspot.com
- **All redirect domains configured and working**

**Website:**
- All pages complete and styled
- Corporate catering focus (not food trucks)
- Mobile optimized per Google 2025 standards
- "The Spot" sister company page fully rebranded (Navy #1B3A5F + Coral #E8704A)
- The Spot Cafe has NEW coffee cup logo with transparent background
- The Spot Cafe has alcohol certification section (Colorado Responsible Vendor Training)
- The Spot Cafe has full catering packages with pricing
- Full menu with rich descriptions + real client photos
- Government capabilities with vendor credentials + Past Performance section
- All quote buttons standardized to "Get Your Free Custom Quote"
- All email links open in new windows (users stay on page)
- Peter Edholm added as third founder throughout site

**CMS:**
- Power Hub CMS complete at https://www.thecrockspot.com/power-hub
- Content editor, Media Library, AI Assist
- ALL pages wired to JSON (15 content files)
- Login: `crockspot` / `crockspot2026`
- PDF/DOCX upload working (uses `unpdf` + `mammoth`)
- GoHighLevel integration for contact forms
- All JSON files validated ✓

**Domain Configuration:**
- thecrockspot.com → Vercel (DNS at GoDaddy: A record + CNAME)
- www.thecrockspot.com → Primary site on Vercel
- denversbestcatering.com → GoDaddy forwarding → thecrockspot.com
- crockspotcatering.com → GoDaddy forwarding → thecrockspot.com

**Infrastructure:**
- All changes committed and pushed
- Vercel auto-deploying from GitHub
- GitHub CLI active account: CrockSpotCatering
- SSL certificates active on all domains
- Documentation fully up to date

**The Spot Cafe Assets (March 31):**
- `public/the-spot-logo.png` - New coffee cup logo (transparent background)
- `public/mandy-alcohol-certificate.jpg` - Alcohol vendor training certificate

### Project Structure
```
crockspot/
├── app/                    # Next.js pages
│   ├── page.tsx           # Homepage
│   ├── about/             # About page
│   ├── catering/          # Catering page
│   ├── menus/             # Menu page
│   ├── contact/           # Contact page
│   ├── the-spot/          # The Spot Cafe page
│   ├── government-capabilities/
│   ├── community-partners/
│   ├── power-hub/         # CMS dashboard
│   └── api/power-hub/     # API routes
├── components/            # React components
├── content/               # JSON content files (13 files)
├── public/                # Static assets
├── SESSION_LOG.md         # What was done
├── RESTART_PROMPT.md      # This file
├── DEPLOYMENT.md          # Deploy guide
├── CLAUDE.md              # Claude instructions
└── README.md              # Project overview
```

### Quick Commands
```bash
cd /Users/brettlechtenberg/Documents/agent-girl/crockspot
npm run dev        # Start dev server (localhost:3000)
npm run build      # Build for production

# Before pushing, ensure correct GitHub account:
gh auth switch -u CrockSpotCatering

# Deploy = push to GitHub
git add . && git commit -m "message" && git push origin main
```

### Business Info
- **Business:** The Crock Spot (Denver food truck catering since 2010)
- **Founders:** Steven, Mandy & Peter Edholm
- **Email:** steven@thecrockspot.com
- **Tagline:** "Let Us Crock Your World"
- **Focus:** Corporate events, weddings, buffet catering
- **Awards:** Best Food Truck (5280), Best Meals on Wheels (Westword), 50 Coolest Small Businesses (Business Insider)
- **Sister Company:** The Spot Cafe (Mandy Smith "Cafe Queen", RiNo District corporate catering)

---

**What I want to work on today:**

[DESCRIBE YOUR TASK HERE]

---

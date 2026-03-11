# 🚀 Crock Spot Deployment Guide

## ✅ Current Status (March 11, 2026)

| Service | URL | Status |
|---------|-----|--------|
| **Live Site** | https://crockspot1.vercel.app | ✅ LIVE |
| **GitHub** | https://github.com/CrockSpotCatering/Crock-Spot-Website-and-Power-Hub | ✅ Synced |
| **Local Path** | `/Users/brettlechtenberg/Documents/agent-girl/crockspot1` | ✅ Ready |

## 📁 Project Structure

```
crockspot1/
├── app/
│   ├── page.tsx              # Home
│   ├── layout.tsx            # Root layout + SEO
│   ├── globals.css           # Global styles
│   ├── about/page.tsx        # About us
│   ├── catering/page.tsx     # Catering services
│   ├── menus/page.tsx        # Full menu
│   ├── contact/page.tsx      # Contact form
│   ├── government-capabilities/page.tsx
│   ├── community-partners/page.tsx
│   ├── privacy/page.tsx
│   └── terms/page.tsx
├── components/
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── CTASection.tsx
│   ├── ContactForm.tsx
│   ├── FAQ.tsx
│   └── Testimonials.tsx
├── public/images/            # Add images here
├── CLAUDE.md
├── DEPLOYMENT.md
├── README.md
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## 🔧 Quick Commands

```bash
# Navigate to project
cd /Users/brettlechtenberg/Documents/agent-girl/crockspot1

# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Deploy to Vercel
vercel --prod --yes

# Push to GitHub (use PAT)
git push https://CrockSpotCatering:<PAT>@github.com/CrockSpotCatering/Crock-Spot-Website-and-Power-Hub.git main
```

## 🔑 Account Credentials

### GitHub
- **Username:** CrockSpotCatering
- **Email:** CrockSpotCatering@gmail.com
- **Password:** CrockSpotCateringIs#1
- **Repo:** https://github.com/CrockSpotCatering/Crock-Spot-Website-and-Power-Hub

> ⚠️ **Note:** GitHub requires a Personal Access Token (PAT) for git push. Create one at: https://github.com/settings/tokens/new (select `repo` scope)

### Vercel
- **Team:** bretts-projects-121b69cc
- **Project:** crockspot1
- **URL:** https://crockspot1.vercel.app

### Supabase (for future forms)
- **Email:** CrockSpotCatering@gmail.com
- **Password:** CrockSpotCateringIs#1
- **Project URL:** https://ptmcisouwmkqiowmxttq.supabase.co

## 🎨 Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Orange | `#F49220` | Primary accent |
| Maroon | `#8C2D2E` | Secondary |
| Green | `#667934` | Success/dietary |
| Purple | `#614B8A` | Accent |
| Dark Purple | `#2F2744` | Dark backgrounds |
| Yellow | `#F0DB9C` | Highlights |

## 🖼️ Images Needed

Add to `/public/images/`:
- `hero-bowl.jpg` - Hero background (1920x1080)
- `crock-spot-logo.png` - Logo
- `food-truck.jpg` - Food truck photo
- `team.jpg` - Steven & Mandy photo
- Food photos for gallery sections

## 📞 Crock Spot Contact Info

- **Email:** steven@thecrockspot.com
- **Website:** thecrockspot.com
- **Facebook:** facebook.com/104226646277525
- **Instagram:** @thecrockspot
- **Founded:** 2010 by Steven & Mandy
- **Location:** Denver, Colorado

---

*Let Us Crock Your World!* 🎸🍲

# The Crock Spot - Website & Power Hub

🎉 **LIVE AT: https://www.thecrockspot.com**

Award-winning food truck catering website for The Crock Spot, Denver's premier slow-cooked gourmet cuisine company.

## Live URLs

| Resource | URL |
|----------|-----|
| **Live Site** | https://www.thecrockspot.com |
| **Power Hub CMS** | https://www.thecrockspot.com/power-hub |
| **GitHub Repo** | https://github.com/CrockSpotCatering/Crock-Spot-Website-and-Power-Hub |

### Redirect Domains
All of these redirect to the main site:
- thecrockspot.com → www.thecrockspot.com
- denversbestcatering.com → thecrockspot.com
- crockspotcatering.com → thecrockspot.com

## About The Crock Spot

- **Founded:** 2010 by Steven, Mandy & Peter Edholm
- **Location:** Denver, Colorado
- **Service Area:** Denver Metro, Front Range & Mountain Regions
- **Awards:** Best Food Truck in Denver (5280 Magazine), Best Meals on Wheels (Westword), 50 Coolest Small Businesses (Business Insider)

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **Styling:** Tailwind CSS 3.4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Language:** TypeScript
- **Content:** JSON-powered CMS (editable via Power Hub)
- **Image Storage:** GitHub API
- **Document Parsing:** unpdf (PDF), mammoth (DOCX)
- **CRM Integration:** GoHighLevel (webhook-based)
- **Deployment:** Vercel (auto-deploy via GitHub)

## Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Orange | `#F49220` | Primary accent |
| Maroon | `#8C2D2E` | Secondary |
| Green | `#667934` | Success/dietary |
| Purple | `#614B8A` | Accent |
| Dark Purple | `#2F2744` | Dark backgrounds |
| Yellow | `#F0DB9C` | Highlights |

## Power Hub CMS

The Power Hub is a full content management system at `/power-hub`:

| Feature | URL | Description |
|---------|-----|-------------|
| **Dashboard** | `/power-hub/dashboard` | Main CMS interface |
| **Content Editor** | `/power-hub/dashboard/content` | Edit all page content via JSON |
| **Media Library** | `/power-hub/dashboard/media` | Upload/manage images (GitHub storage) |
| **AI Assist** | `/power-hub/dashboard/ai` | AI-powered content writing (PDF/Word upload) |
| **Settings** | `/power-hub/dashboard/settings` | Portal configuration |

**Power Hub Login:** `crockspot` / `crockspot2026`

## JSON Content System

All page content is stored in `/content/*.json` files and can be edited via the Power Hub:

| File | Controls |
|------|----------|
| `home.json` | Homepage hero, features, build-your-bowl |
| `about.json` | About page, founders, timeline, awards |
| `catering.json` | Catering services, pricing, process |
| `menus.json` | Full menu items (bases, proteins, etc.) |
| `contact.json` | Contact info, hours, form settings |
| `shared.json` | Testimonials, FAQ (used across pages) |
| `government-capabilities.json` | Vendor credentials, capabilities |
| `community-partners.json` | Community partnerships |
| `the-spot.json` | The Spot Cafe sister company |
| `footer.json` | Footer content |
| `documents.json` | AI Assist brand documents |
| `settings.json` | AI provider settings & API keys |
| `credentials.json` | Power Hub login credentials |

**How it works:** Pages import JSON → render content dynamically → edit JSON in Power Hub → changes appear on site.

## Project Structure

```
crockspot/
├── app/
│   ├── page.tsx              # Home (imports home.json)
│   ├── layout.tsx            # Root layout with SEO
│   ├── globals.css           # Global styles
│   ├── about/page.tsx        # About (imports about.json)
│   ├── catering/page.tsx     # Catering (imports catering.json)
│   ├── menus/page.tsx        # Menus (imports menus.json)
│   ├── contact/page.tsx      # Contact (imports contact.json)
│   ├── government-capabilities/
│   ├── community-partners/
│   ├── the-spot/
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   ├── power-hub/            # CMS Dashboard
│   │   ├── page.tsx          # Login page
│   │   └── dashboard/
│   │       ├── page.tsx      # Dashboard home
│   │       ├── content/      # Content editor
│   │       ├── media/        # Media library
│   │       ├── ai/           # AI assistant
│   │       └── settings/     # Settings
│   ├── api/contact/route.ts  # GoHighLevel webhook integration
│   └── api/power-hub/        # API Routes
│       ├── content/route.ts  # Read/write JSON
│       ├── documents/route.ts # Brand document storage
│       ├── media/route.ts    # List images from GitHub
│       ├── upload/route.ts   # Upload/delete images
│       ├── ai/route.ts       # AI content generation
│       ├── credentials/route.ts # Power Hub login credentials
│       └── parse-document/route.ts  # PDF/Word parsing
├── components/
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── CTASection.tsx
│   ├── ContactForm.tsx
│   ├── FAQ.tsx               # (imports shared.json)
│   ├── Testimonials.tsx      # (imports shared.json)
│   └── power-hub/            # CMS Components
│       ├── Header.tsx
│       └── Sidebar.tsx
├── content/                  # JSON Content Files
│   ├── home.json
│   ├── about.json
│   ├── catering.json
│   ├── menus.json
│   ├── contact.json
│   ├── shared.json
│   └── ... (15 total)
└── public/
    └── images/
        └── uploads/          # User-uploaded images
```

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment to Vercel

### Auto-Deploy (Recommended)

This project uses automatic deployment:

1. Push code to GitHub repository
2. Vercel automatically detects the push
3. Vercel builds and deploys automatically
4. Done! No CLI commands needed

```bash
git add .
git commit -m "Your message"
git push origin main
```

> **NEVER use Vercel CLI** - Always deploy via GitHub integration only!

## Environment Variables

Set these in Vercel Dashboard:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `GITHUB_TOKEN` | GitHub API access for image/document storage |

## Features

- Responsive design (mobile-first, Google 2025 standards)
- SEO optimized with structured data
- Fast page loads with Next.js optimization
- Animated interactions with Framer Motion
- Contact form on every page (connected to GoHighLevel CRM)
- Full menu with dietary labels
- Government capabilities section
- Community partners page
- AI Assist with PDF/DOCX upload for brand context
- Media library with GitHub storage
- GitHub-backed credential management (multi-device sync)
- GoHighLevel integration for lead management

## Pages

1. **Home** - Hero, services, build-your-bowl, testimonials, FAQ
2. **Catering** - Service options, pricing, process
3. **About** - Story, timeline, values, awards
4. **Menus** - Full menu with bases, proteins, sauces, toppers
5. **Government Capabilities** - Services for government agencies
6. **Community Partners** - Partnership opportunities
7. **The Spot** - Sister company (The Spot Cafe)
8. **Contact** - Contact form and information

## Contact

- **Email:** steven@thecrockspot.com
- **Website:** https://www.thecrockspot.com
- **Facebook:** [The Crock Spot](https://www.facebook.com/104226646277525)
- **Instagram:** [@thecrockspot](https://www.instagram.com/thecrockspot)

---

*"Let Us Crock Your World"*

Built with love for The Crock Spot

# The Crock Spot - Website & Power Hub

🍲 Award-winning food truck catering website for The Crock Spot, Denver's premier slow-cooked gourmet cuisine company.

## 🎸 About The Crock Spot

- **Founded:** 2010 by Steven & Mandy
- **Location:** Denver, Colorado
- **Service Area:** Denver Metro, Front Range & Mountain Regions
- **Awards:** Best Food Truck in Denver (5280 Magazine), Best Meals on Wheels (Westword), 50 Coolest Small Businesses (Business Insider)

## 🚀 Tech Stack

- **Framework:** Next.js 16 with App Router
- **Styling:** Tailwind CSS 3.4
- **Animations:** Framer Motion
- **Icons:** React Icons & Lucide React
- **Language:** TypeScript
- **Content:** JSON-powered CMS (editable via Power Hub)
- **Image Storage:** GitHub API
- **Document Parsing:** pdf-parse, mammoth
- **Deployment:** Vercel (auto-deploy via GitHub)

## 🎨 Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Orange | `#F49220` | Primary accent |
| Maroon | `#8C2D2E` | Secondary |
| Green | `#667934` | Success/dietary |
| Purple | `#614B8A` | Accent |
| Dark Purple | `#2F2744` | Dark backgrounds |
| Yellow | `#F0DB9C` | Highlights |

## 🔐 Power Hub CMS

The Power Hub is a full content management system at `/power-hub`:

| Feature | URL | Description |
|---------|-----|-------------|
| **Dashboard** | `/power-hub/dashboard` | Main CMS interface |
| **Content Editor** | `/power-hub/dashboard/content` | Edit all page content via JSON |
| **Media Library** | `/power-hub/dashboard/media` | Upload/manage images (GitHub storage) |
| **AI Assist** | `/power-hub/dashboard/ai` | AI-powered content writing (PDF/Word upload) |
| **Settings** | `/power-hub/dashboard/settings` | Portal configuration |

**Power Hub Login:** `crockspot` / `letusrock2024`

## 📄 JSON Content System

All page content is stored in `/content/*.json` files and can be edited via the Power Hub:

| File | Controls |
|------|----------|
| `home.json` | Homepage hero, features, build-your-bowl |
| `about.json` | About page, founders, timeline, awards |
| `catering.json` | Catering services, pricing, process |
| `menus.json` | Full menu items (bases, proteins, etc.) |
| `contact.json` | Contact info, hours, form settings |
| `shared.json` | Testimonials, FAQ (used across pages) |

**How it works:** Pages import JSON → render content dynamically → edit JSON in Power Hub → changes appear on site.

## 📁 Project Structure

```
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
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   ├── power-hub/            # 🆕 CMS Dashboard
│   │   ├── page.tsx          # Login page
│   │   └── dashboard/
│   │       ├── page.tsx      # Dashboard home
│   │       ├── content/      # Content editor
│   │       ├── media/        # Media library
│   │       ├── ai/           # AI assistant
│   │       └── settings/     # Settings
│   └── api/power-hub/        # 🆕 API Routes
│       ├── content/route.ts  # Read/write JSON
│       ├── media/route.ts    # List images from GitHub
│       ├── upload/route.ts   # Upload/delete images
│       ├── ai/route.ts       # AI content generation
│       └── parse-document/route.ts  # PDF/Word parsing
├── components/
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── CTASection.tsx
│   ├── ContactForm.tsx
│   ├── FAQ.tsx               # (imports shared.json)
│   ├── Testimonials.tsx      # (imports shared.json)
│   └── power-hub/            # 🆕 CMS Components
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       └── JsonEditor.tsx
├── content/                  # 🆕 JSON Content Files
│   ├── home.json
│   ├── about.json
│   ├── catering.json
│   ├── menus.json
│   ├── contact.json
│   └── shared.json
└── public/
    └── images/
        └── uploads/          # 🆕 User-uploaded images
```

## 🖼️ Images Needed

Add these images to `/public/images/`:
- `hero-bowl.jpg` - Hero section background
- `crock-spot-logo.png` - Company logo
- `food-truck.jpg` - Food truck photos
- `team.jpg` - Team/founders photo
- Various food/event photos

## 🔧 Local Development

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

## 🚢 Deployment to Vercel

### Option 1: Via Vercel Dashboard (Recommended)

1. Push code to GitHub repository
2. Go to [Vercel](https://vercel.com)
3. Import the GitHub repository
4. Configure project settings (auto-detected for Next.js)
5. Deploy!

### Option 2: Connect GitHub to Vercel

1. Log into Vercel with GitHub
2. Select "Import Project"
3. Choose the Crock Spot repository
4. Vercel will auto-detect Next.js and configure

## 📋 GitHub Repository Setup

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Crock Spot website"

# Add remote
git remote add origin https://github.com/CrockSpotCatering/Crock-Spot-Website-and-Power-Hub.git

# Push
git push -u origin main
```

## ⚙️ Environment Variables

Create a `.env.local` file for any environment variables:

```env
# Add as needed
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## 📱 Features

- ✅ Responsive design (mobile-first)
- ✅ SEO optimized with structured data
- ✅ Fast page loads with Next.js optimization
- ✅ Animated interactions with Framer Motion
- ✅ Contact form on every page
- ✅ Full menu with dietary labels
- ✅ Government capabilities section
- ✅ Community partners page

## 🎯 Pages

1. **Home** - Hero, services, build-your-bowl, testimonials, FAQ
2. **Catering** - Service options, pricing, process
3. **About** - Story, timeline, values, awards
4. **Menus** - Full menu with bases, proteins, sauces, toppers
5. **Government Capabilities** - Services for government agencies
6. **Community Partners** - Partnership opportunities
7. **Contact** - Contact form and information

## 📞 Contact

- **Email:** steven@thecrockspot.com
- **Website:** https://thecrockspot.com
- **Facebook:** [The Crock Spot](https://www.facebook.com/104226646277525)
- **Instagram:** [@thecrockspot](https://www.instagram.com/thecrockspot)

---

*"Let Us Crock Your World"* 🎸

Built with ❤️ for The Crock Spot

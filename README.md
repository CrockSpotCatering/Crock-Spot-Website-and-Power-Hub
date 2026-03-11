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
- **Icons:** React Icons
- **Language:** TypeScript
- **Deployment:** Vercel

## 🎨 Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Orange | `#F49220` | Primary accent |
| Maroon | `#8C2D2E` | Secondary |
| Green | `#667934` | Success/dietary |
| Purple | `#614B8A` | Accent |
| Dark Purple | `#2F2744` | Dark backgrounds |
| Yellow | `#F0DB9C` | Highlights |

## 📁 Project Structure

```
├── app/
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout with SEO
│   ├── globals.css           # Global styles
│   ├── catering/page.tsx     # Catering services
│   ├── about/page.tsx        # About us
│   ├── menus/page.tsx        # Full menu
│   ├── contact/page.tsx      # Contact form
│   ├── government-capabilities/  # Gov't services
│   ├── community-partners/   # Partnerships
│   ├── privacy/page.tsx      # Privacy policy
│   └── terms/page.tsx        # Terms of service
├── components/
│   ├── Navigation.tsx        # Header navigation
│   ├── Footer.tsx            # Site footer
│   ├── CTASection.tsx        # Call-to-action sections
│   ├── ContactForm.tsx       # Contact form component
│   ├── FAQ.tsx               # FAQ accordion
│   └── Testimonials.tsx      # Testimonials section
└── public/
    └── images/               # Add images here
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

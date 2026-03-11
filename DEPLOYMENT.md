# 🚀 Deployment Guide for Crock Spot Website

## Step 1: Push to GitHub

The code is ready and committed locally. You need to push it to the Crock Spot GitHub account.

### Option A: Push from Terminal (Recommended)

1. Open Terminal
2. Navigate to the project:
   ```bash
   cd /Users/brettlechtenberg/Documents/agent-girl/chat-55abaeda
   ```

3. Log into GitHub CLI with Crock Spot credentials:
   ```bash
   gh auth login
   ```
   - Choose GitHub.com
   - Choose HTTPS
   - Enter credentials:
     - Email: CrockSpotCatering@gmail.com
     - Password: CrockSpotCateringIs#1

4. Push to GitHub:
   ```bash
   git push -u origin main
   ```

### Option B: Upload via GitHub Web

1. Go to: https://github.com/CrockSpotCatering/Crock-Spot-Website-and-Power-Hub
2. Click "uploading an existing file" or use the "Add file" dropdown
3. Drag and drop all files from this folder
4. Commit the changes

---

## Step 2: Connect to Vercel

1. Go to: https://vercel.com/new?teamSlug=crockspotcaterings-projects
2. Sign in with GitHub (CrockSpotCatering account)
3. Import the "Crock-Spot-Website-and-Power-Hub" repository
4. Vercel will auto-detect Next.js - use these settings:
   - **Framework Preset:** Next.js
   - **Root Directory:** ./
   - **Build Command:** next build
   - **Output Directory:** .next
5. Click "Deploy"

---

## Step 3: Configure Domain (Optional)

After deployment, configure your custom domain:

1. In Vercel dashboard, go to your project
2. Click "Settings" > "Domains"
3. Add "thecrockspot.com" and follow DNS instructions

---

## Step 4: Add Images

Don't forget to add images to `/public/images/`:

1. Create the `/public/images/` directory
2. Add these images:
   - `hero-bowl.jpg` - Hero section background (recommended: 1920x1080)
   - `crock-spot-logo.png` - Logo file
   - `food-truck.jpg` - Food truck photo
   - `team.jpg` - Founders/team photo
   - Various food photos for the gallery sections

3. Commit and push the images:
   ```bash
   git add public/images/
   git commit -m "Add images"
   git push
   ```

---

## Account Credentials (for reference)

### GitHub
- Email: CrockSpotCatering@gmail.com
- Password: CrockSpotCateringIs#1
- Username: CrockSpotCatering
- Repo: https://github.com/CrockSpotCatering/Crock-Spot-Website-and-Power-Hub

### Vercel
- Connect via GitHub OAuth
- Team: crockspotcaterings-projects

### Supabase (if needed later for forms)
- Email: CrockSpotCatering@gmail.com
- Password: CrockSpotCateringIs#1
- Project URL: https://ptmcisouwmkqiowmxttq.supabase.co

---

## Quick Start Commands

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

---

## 🎉 That's It!

Once deployed, your site will be live at:
- Vercel URL: `https://crock-spot-website-and-power-hub.vercel.app` (or similar)
- Custom domain: `https://thecrockspot.com` (after DNS configuration)

Let Us Crock Your World! 🎸🍲

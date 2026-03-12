# The Crock Spot - Project Instructions

## Project Overview
The Crock Spot is Denver's premier event caterer. This is a Next.js 16 website with a JSON-powered CMS.

## CRITICAL: Read First
Before making any changes, read these files in order:
1. `SESSION_LOG.md` - Recent work and current status
2. `RESTART_PROMPT.md` - Full project context
3. `DEPLOYMENT.md` - Deployment procedures

## Key Rules

### Deployment
```
🚫 NEVER use Vercel CLI (vercel, vercel --prod)
✅ ONLY deploy via: git push origin main → Vercel auto-deploys
```

### GitHub Account
```
🚫 NEVER use BoardChairIs1 or BrettLechtenbrerg accounts
✅ ONLY use CrockSpotCatering account
✅ Run: gh auth switch -u CrockSpotCatering
```

## Project Structure
- `/app/` - Next.js pages and API routes
- `/content/*.json` - CMS content (edit here or via Power Hub)
- `/components/` - React components
- `/public/` - Static assets

## Quick Commands
```bash
cd /Users/brettlechtenberg/Documents/agent-girl/crockspot1
npm run dev          # Dev server at localhost:3000
npm run build        # Build for production
git push origin main # Deploy to Vercel
```

## Business Focus
- **Primary:** Corporate events, weddings, buffet catering
- **Secondary:** Food truck option for outdoor events
- **Tagline:** "Let Us Crock Your World"

## URLs
- Live: https://crock-spot-website-and-power-hub.vercel.app
- CMS: https://crock-spot-website-and-power-hub.vercel.app/power-hub
- GitHub: https://github.com/CrockSpotCatering/Crock-Spot-Website-and-Power-Hub

## General Guidelines

### Communication Style
- Be concise and direct
- Match response length to question complexity
- Professional yet approachable
- Ask clarifying questions rather than assuming

### Problem-Solving
1. Understand the full context before answering
2. Break down complex questions into manageable parts
3. Provide practical, actionable solutions
4. Offer alternatives when appropriate

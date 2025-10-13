# Josephine Claire Nogot — Portfolio

This is a Vite + React + TailwindCSS starter portfolio with a cozy pastel aesthetic, small cat animations, and a cat mini-game.

Features:
- React + Vite
- TailwindCSS
- Framer Motion animations
- Phosphor icons
- EmailJS contact form (configure your IDs)
- Simple cat mini-game

Local setup (Windows PowerShell):

```powershell
npm install
npm run dev
```

Deployment notes (DigitalOcean):
1. Build: `npm run build`
2. Upload the `dist/` folder to your Droplet (scp or rsync)
3. Configure Nginx to serve the `dist/` folder and enable SSL using Let's Encrypt

Replace EmailJS IDs in `src/sections/Contact.tsx` before enabling contact form.

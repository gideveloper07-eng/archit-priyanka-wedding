# Archit ji & Priyanka — Wedding Invitation

A responsive, dark-cinematic Indian wedding invitation website built with React + Vite. Designed in burgundy, warm ivory, and gold. Includes a live countdown, wedding details, RSVP form that composes a WhatsApp message, and copy-invitation button.

## Requirements
- Node.js 20.19+ or 22.12+ recommended
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Configure WhatsApp RSVP

Open `src/main.jsx` and find:

```js
const WHATSAPP_NUMBER = '';
```

Replace the empty string with the couple's WhatsApp number in international format, digits only, with no `+`, spaces, or dashes. Example format for India: `919876543210`.

Until you set this number, the RSVP button displays a reminder instead of opening WhatsApp. The site does not store RSVP data on a server; it prepares a message in WhatsApp for the guest to review and send.

## Update event details

- Names, date, and countdown: `src/main.jsx` (`WEDDING_DATE` and the visible names/date text).
- Venue: update the event card in `src/main.jsx`; the map link currently points to Jodhpur, Rajasthan.
- Styles: `src/styles.css`.

The ceremony time and exact venue have not been supplied, so the page intentionally says “Time to be announced” and notes that the exact venue will be shared soon.

## Production build

```bash
npm run build
npm run preview
```

Vite writes the production build to `dist/`.

## Deploy to Vercel

1. Create a Git repository and push this project to GitHub, GitLab, or Bitbucket.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Click **Deploy**. The included `vercel.json` supports SPA routing.

Alternatively, install the Vercel CLI and run `vercel` from this directory, then `vercel --prod` for production deployment.

## Notes
- Google Fonts are loaded from Google Fonts; a network connection is needed for those fonts. System fallbacks are included.
- RSVP is WhatsApp-based and does not require a backend or database.

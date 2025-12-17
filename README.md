## Birthday Web App

A small, mobile-first birthday experience built with **React + Vite**, focused on smooth transitions, playful animations, and an emotional final message reveal.

### Tech stack

- React (functional components + hooks)
- Vite (no backend, pure SPA)
- JavaScript (no TypeScript)
- Single global CSS file (`src/styles.css`)
- Optional confetti via `canvas-confetti`

### Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

### App flow

1. **Countdown screen** – Floating balloons, countdown to a configurable target date, and a celebrate button that unlocks when the timer reaches zero (with confetti).
2. **Gift screen** – A pulsing gift box with the message: “I have made a gift for you” and a button to continue.
3. **Party mode screen** – “It’s your madam, and I have made something special for you” with decorative party lights, faster balloons, and a “Turn the lights on” button.
4. **Curtain message screen** – A curtain animation that opens on tap to reveal a handwritten-style letter, randomly chosen from `src/data/messages.js`.

### Customization

- **Birthday date/time** – Update `TARGET_BIRTHDAY_ISO` in `src/App.jsx`.
- **Messages** – Edit the `messages` array in `src/data/messages.js`.
- **Colors & animation timings** – Tweak CSS variables at the top of `src/styles.css`.



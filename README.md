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

1. **Countdown screen** – Floating balloons, countdown to a configurable target date, age display showing how old they're turning, and a celebrate button that unlocks when the timer reaches zero (with confetti and fireworks).
2. **Cake screen** – Interactive birthday cake with candle that can be blown out, and cake cutting animation.
3. **Gift screen** – A pulsing gift box with the message: "I have made a gift for you" and a button to continue.
4. **Memory Gallery screen** – A beautiful gallery showcasing memories with customizable photo placeholders (NEW!).
5. **Party mode screen** – "It's your madam, and I have made something special for you" with decorative party lights, faster balloons, and a "Turn the lights on" button.
6. **Curtain message screen** – A curtain animation that opens on tap to reveal a handwritten-style letter, randomly chosen from `src/data/messages.js`.

### New Features ✨

- **✨ Sparkles Animation** – Magical twinkling sparkles appear throughout the experience once the countdown completes
- **🎆 Enhanced Fireworks** – Multiple firework bursts from different positions for more celebration
- **🎂 Age Display** – Shows the age they're turning on the countdown screen
- **📸 Memory Gallery** – New screen with a beautiful grid of memory cards (customize photos in `src/components/MemoryGallery.jsx`)

### Customization

- **Birthday date/time** – Update `TARGET_BIRTHDAY_ISO` in `src/App.jsx`.
- **Birth date for age calculation** – Update `BIRTH_DATE_ISO` in `src/App.jsx` to show the correct age.
- **Messages** – Edit the `messages` array in `src/data/messages.js`.
- **Memory Gallery** – Customize memories and add photos in `src/components/MemoryGallery.jsx`.
- **Colors & animation timings** – Tweak CSS variables at the top of `src/styles.css`.




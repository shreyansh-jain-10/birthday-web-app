import React, { useCallback, useState } from 'react';
import confetti from 'canvas-confetti';
import Countdown from './components/Countdown.jsx';
import CakeScreen from './components/CakeScreen.jsx';
import GiftScreen from './components/GiftScreen.jsx';
import PartyScreen from './components/PartyScreen.jsx';
import CurtainMessage from './components/CurtainMessage.jsx';
import Balloons from './components/Balloons.jsx';
import { messages } from './data/messages.js';

// Central configuration values for easy customization.
// Countdown target: 20 December, 12:00 AM (local time)
const TARGET_BIRTHDAY_ISO = '2025-12-20T00:00:00';
const CONFETTI_PARTICLE_COUNT = 90;
const CONFETTI_BURST_COUNT = 3;
const CONFETTI_BURST_INTERVAL_MS = 420;

const initialTargetDate = new Date(TARGET_BIRTHDAY_ISO);

function fireConfettiBursts() {
  let bursts = 0;
  const intervalId = setInterval(() => {
    confetti({
      particleCount: CONFETTI_PARTICLE_COUNT,
      spread: 70,
      origin: { y: 0.7 },
    });

    bursts += 1;
    if (bursts >= CONFETTI_BURST_COUNT) {
      clearInterval(intervalId);
    }
  }, CONFETTI_BURST_INTERVAL_MS);
}

function getRandomMessage() {
  if (!messages || messages.length === 0) return '';
  const index = Math.floor(Math.random() * messages.length);
  return messages[index];
}

export default function App() {
  const [screen, setScreen] = useState('countdown'); // "countdown" | "cake" | "gift" | "party" | "message"
  const [hasCountdownFinished, setHasCountdownFinished] = useState(false);
  const [partyOn, setPartyOn] = useState(false);
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(getRandomMessage);

  const handleCountdownComplete = useCallback(() => {
    setHasCountdownFinished(true);
    fireConfettiBursts();
  }, []);

  const handleCelebrate = useCallback(() => {
    setScreen('cake');
  }, []);

  const handleCakeNext = useCallback(() => {
    setScreen('gift');
  }, []);

  const handleGiftNext = useCallback(() => {
    setScreen('party');
  }, []);

  const handleTurnLightsOn = useCallback(() => {
    setPartyOn((previous) => {
      if (!previous) {
        fireConfettiBursts();
      }
      return true;
    });
  }, []);

  const handleShowMessage = useCallback(() => {
    setSelectedMessage(getRandomMessage());
    setCurtainsOpen(false);
    setScreen('message');
  }, []);

  const handleToggleCurtains = useCallback(() => {
    setCurtainsOpen((open) => {
      const nextOpen = !open;
      if (!open && nextOpen) {
        fireConfettiBursts();
      }
      return nextOpen;
    });
  }, []);

  const handleGoHome = useCallback(() => {
    setScreen('countdown');
    setPartyOn(false);
    setCurtainsOpen(false);
  }, []);

  return (
    <div className={`app ${partyOn ? 'app--party' : ''}`}>
      <Balloons fast={partyOn} />

      <main className="app-inner">
        {screen !== 'countdown' && (
          <button
            type="button"
            className="home-button"
            onClick={handleGoHome}
          >
            <span className="home-button__icon">←</span>
            <span className="home-button__label">Back to home</span>
          </button>
        )}

        {screen === 'countdown' && (
          <Countdown
            targetDate={initialTargetDate}
            onComplete={handleCountdownComplete}
            onCelebrate={handleCelebrate}
            isReady={hasCountdownFinished}
          />
        )}

        {screen === 'cake' && (
          <CakeScreen onNext={handleCakeNext} />
        )}

        {screen === 'gift' && (
          <GiftScreen onNext={handleGiftNext} />
        )}

        {screen === 'party' && (
          <PartyScreen
            partyOn={partyOn}
            onTurnLightsOn={handleTurnLightsOn}
            onShowMessage={handleShowMessage}
          />
        )}

        {screen === 'message' && (
          <CurtainMessage
            curtainsOpen={curtainsOpen}
            message={selectedMessage}
            onToggleCurtains={handleToggleCurtains}
          />
        )}
      </main>
    </div>
  );
}



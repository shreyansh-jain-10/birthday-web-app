import React, { useCallback, useState } from 'react';
import confetti from 'canvas-confetti';
import Countdown from './components/Countdown.jsx';
import BirthdaySurpriseScreen from './components/BirthdaySurpriseScreen.jsx';
import BeautifulGirlScreen from './components/BeautifulGirlScreen.jsx';
import PresentBeautifulGirlScreen from './components/PresentBeautifulGirlScreen.jsx';
import ChildhoodBeautifulScreen from './components/ChildhoodBeautifulScreen.jsx';
import CakeScreen from './components/CakeScreen.jsx';
import SelfiesTogetherScreen from './components/SelfiesTogetherScreen.jsx';
import PartyScreen from './components/PartyScreen.jsx';
import CurtainMessage from './components/CurtainMessage.jsx';
import MemoryGallery from './components/MemoryGallery.jsx';
import MessageIntroScreen from './components/MessageIntroScreen.jsx';
import Balloons from './components/Balloons.jsx';
import Sparkles from './components/Sparkles.jsx';
import Fireworks from './components/Fireworks.jsx';
import { messages } from './data/messages.js';

// Central configuration values for easy customization.
// Countdown target: 20 December, 12:00 AM (local time)
const TARGET_BIRTHDAY_ISO = '2025-12-20T00:00:00';
// Birth date for age calculation (adjust this to the actual birth date)
const BIRTH_DATE_ISO = '2000-12-20'; // Example: adjust to actual birth year
const CONFETTI_PARTICLE_COUNT = 90;
const CONFETTI_BURST_COUNT = 3;
const CONFETTI_BURST_INTERVAL_MS = 420;

const initialTargetDate = new Date(TARGET_BIRTHDAY_ISO);

// Calculate age they're turning
function calculateAge(birthDate, targetDate) {
  const birth = new Date(birthDate);
  const target = new Date(targetDate);
  let age = target.getFullYear() - birth.getFullYear();
  const monthDiff = target.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && target.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

const age = calculateAge(BIRTH_DATE_ISO, TARGET_BIRTHDAY_ISO);

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
  const [screen, setScreen] = useState('countdown'); // "countdown" | "party" | "birthdaySurprise" | "beautifulGirl" | "presentBeautifulGirl" | "childhoodBeautiful" | "cake" | "selfiesTogether" | "gallery" | "messageIntro" | "message"
  const [hasCountdownFinished, setHasCountdownFinished] = useState(false);
  const [partyOn, setPartyOn] = useState(false);
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(getRandomMessage);
  const [fireworksTrigger, setFireworksTrigger] = useState(0);

  const handleCountdownComplete = useCallback(() => {
    setHasCountdownFinished(true);
    fireConfettiBursts();
    setFireworksTrigger((prev) => prev + 1);
  }, []);

  const handleCelebrate = useCallback(() => {
    setScreen('party');
  }, []);

  const handlePartyNext = useCallback(() => {
    setScreen('birthdaySurprise');
  }, []);

  const handleBirthdaySurpriseNext = useCallback(() => {
    setScreen('beautifulGirl');
  }, []);

  const handleBeautifulGirlNext = useCallback(() => {
    setScreen('presentBeautifulGirl');
  }, []);

  const handlePresentBeautifulGirlNext = useCallback(() => {
    setScreen('childhoodBeautiful');
  }, []);

  const handleChildhoodBeautifulNext = useCallback(() => {
    setScreen('cake');
  }, []);

  const handleCakeNext = useCallback(() => {
    setScreen('selfiesTogether');
  }, []);

  const handleSelfiesTogetherNext = useCallback(() => {
    setScreen('gallery');
  }, []);

  const handleGalleryNext = useCallback(() => {
    setScreen('messageIntro');
  }, []);

  const handleMessageIntroNext = useCallback(() => {
    setScreen('message');
  }, []);

  const handleTurnLightsOn = useCallback(() => {
    setPartyOn((previous) => {
      if (!previous) {
        fireConfettiBursts();
        setFireworksTrigger((prev) => prev + 1);
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
        setFireworksTrigger((prev) => prev + 1);
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
      <Sparkles active={hasCountdownFinished || partyOn} />
      <Fireworks trigger={fireworksTrigger} intensity="medium" />

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
            age={age}
          />
        )}

        {screen === 'birthdaySurprise' && (
          <BirthdaySurpriseScreen onNext={handleBirthdaySurpriseNext} />
        )}

        {screen === 'beautifulGirl' && (
          <BeautifulGirlScreen onNext={handleBeautifulGirlNext} />
        )}

        {screen === 'presentBeautifulGirl' && (
          <PresentBeautifulGirlScreen onNext={handlePresentBeautifulGirlNext} />
        )}

        {screen === 'childhoodBeautiful' && (
          <ChildhoodBeautifulScreen onNext={handleChildhoodBeautifulNext} />
        )}

        {screen === 'cake' && (
          <CakeScreen 
            onNext={handleCakeNext}
            onCakeCut={() => {
              setFireworksTrigger((prev) => prev + 1);
            }}
          />
        )}

        {screen === 'selfiesTogether' && (
          <SelfiesTogetherScreen onNext={handleSelfiesTogetherNext} />
        )}

        {screen === 'gallery' && (
          <MemoryGallery onNext={handleGalleryNext} />
        )}

        {screen === 'messageIntro' && (
          <MessageIntroScreen onNext={handleMessageIntroNext} />
        )}

        {screen === 'party' && (
          <PartyScreen
            partyOn={partyOn}
            onTurnLightsOn={handleTurnLightsOn}
            onNext={handlePartyNext}
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



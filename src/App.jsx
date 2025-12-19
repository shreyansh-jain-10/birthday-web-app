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
import MusicPlayer from './components/MusicPlayer.jsx';
// Central configuration values for easy customization.
// Countdown target: 20 December, 12:00 AM (local time)
const TARGET_BIRTHDAY_ISO = '2025-12-20T00:00:00';
// Birth date for age calculation (adjust this to the actual birth date)
const BIRTH_DATE_ISO = '2000-12-20'; // Example: adjust to actual birth year
const CONFETTI_PARTICLE_COUNT = 90;
const CONFETTI_BURST_COUNT = 3;
const CONFETTI_BURST_INTERVAL_MS = 420;

// Music URL from Cloudinary - upload your music file to Cloudinary and add the URL here
// Example: 'https://res.cloudinary.com/dd6gpvdcx/video/upload/v1234567890/birthday-music.mp3'
const MUSIC_URL = 'https://res.cloudinary.com/dd6gpvdcx/video/upload/v1766151717/birthday-music_coyl10.mp3';

// Custom birthday message - write your own message here
const CUSTOM_MESSAGE = `
Happiest Birthday, my baby ❤️
(SCROLL KRIYEGA)
I'm truly grateful for your existence.
You are so pretty—the prettiest girl I've ever seen, honestly.
You are so special to me.
The way you take care of me and the way you support me is truly exceptional.
It's a very special day for me, because aaj aap aayi—tabhi toh mujhe aap mili
(thanks to mummy-papa 👀).
Honestly, I never thought that after everything that happened in the past, hum milenge bhi.
But as we know, jo cheez apni hoti hai, woh eventually apne paas aa hi jaati hai 🧿.
Many more birthdays with me to go🧿
Gifts are waiting for you
(though I'm the one waiting eagerly👀).
Aapka Romeo will be waiting for you to take you on a date at Romeo Lane.
I really wanna hug you and kiss you and make you feel special on this special day.
I want to give you everything you want(I mean literaly everything).
I love you so much ❤️🧿
And once again, happiest birthday, my baby 😩❤️`;

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


export default function App() {
  const [screen, setScreen] = useState('countdown'); // "countdown" | "party" | "birthdaySurprise" | "beautifulGirl" | "presentBeautifulGirl" | "childhoodBeautiful" | "cake" | "selfiesTogether" | "gallery" | "messageIntro" | "message"
  const [hasCountdownFinished, setHasCountdownFinished] = useState(false);
  const [partyOn, setPartyOn] = useState(false);
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(CUSTOM_MESSAGE);
  const [fireworksTrigger, setFireworksTrigger] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const handleCountdownComplete = useCallback(() => {
    setHasCountdownFinished(true);
    // Fire immediate confetti burst when timer hits zero
    confetti({
      particleCount: CONFETTI_PARTICLE_COUNT,
      spread: 70,
      origin: { y: 0.7 },
    });
    fireConfettiBursts();
    setFireworksTrigger((prev) => prev + 1);
  }, []);

  const handleCelebrate = useCallback(() => {
    setScreen('party');
    setMusicPlaying(true);
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
    setSelectedMessage(CUSTOM_MESSAGE);
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
    setMusicPlaying(false);
  }, []);

  return (
    <div className={`app ${partyOn ? 'app--party' : ''}`}>
      <MusicPlayer play={musicPlaying} loop={true} volume={0.5} musicUrl={MUSIC_URL} />
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



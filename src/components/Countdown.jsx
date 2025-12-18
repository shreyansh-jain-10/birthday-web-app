import React, { useEffect, useRef, useState } from 'react';
import CelebrateButton from './CelebrateButton.jsx';

const TICK_INTERVAL_MS = 1000;

function getTimeRemaining(targetDate) {
  const now = new Date().getTime();
  const total = targetDate.getTime() - now;
  const clamped = Math.max(total, 0);

  const seconds = Math.floor((clamped / 1000) % 60);
  const minutes = Math.floor((clamped / 1000 / 60) % 60);
  const hours = Math.floor((clamped / (1000 * 60 * 60)) % 24);
  const days = Math.floor(clamped / (1000 * 60 * 60 * 24));

  return {
    total: clamped,
    days,
    hours,
    minutes,
    seconds,
  };
}

export default function Countdown({ targetDate, onComplete, onCelebrate, isReady, age }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeRemaining(targetDate));
  const completeCalledRef = useRef(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        const next = getTimeRemaining(targetDate);
        return next.total !== prev.total ? next : prev;
      });
    }, TICK_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  useEffect(() => {
    if (!completeCalledRef.current && timeLeft.total === 0) {
      completeCalledRef.current = true;
      if (typeof onComplete === 'function') {
        onComplete();
      }
    }
  }, [timeLeft.total, onComplete]);

  const isComplete = isReady || timeLeft.total === 0;

  return (
    <section className="screen screen--centered countdown-screen">
      <div className="screen-content">
        <p className="eyebrow">Your birthday countdown starts now 🎂</p>
        <h1 className="title">Happy almost-birthday, Anushka! 🥳</h1>

        <div className="countdown">
          <TimeBlock label="Days" value={timeLeft.days} />
          <TimeBlock label="Hours" value={timeLeft.hours} />
          <TimeBlock label="Minutes" value={timeLeft.minutes} />
          <TimeBlock label="Seconds" value={timeLeft.seconds} />
        </div>

        <p className="subtitle">
          When the timer hits zero, tap the button below and let your birthday surprise burst into
          color, Anushka.
        </p>

        <CelebrateButton
          disabled={false}
          onClick={onCelebrate}
        />
      </div>
    </section>
  );
}

function TimeBlock({ label, value }) {
  const padded = String(value).padStart(2, '0');

  return (
    <div className="time-block">
      <div className="time-block__value">{padded}</div>
      <div className="time-block__label">{label}</div>
    </div>
  );
}



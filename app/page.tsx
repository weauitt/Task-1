"use client";
import { startDate, endDate } from "./api/dates";
import { useState, useEffect } from "react";

export default function Home() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isCountdownToEnd, setIsCountdownToEnd] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const updateCountdown = (difference: number) => {
    const d = Math.floor(difference / (1000 * 60 * 60 * 24));
    setDays(d);

    const h = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    setHours(h);

    const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    setMinutes(m);

    const s = Math.floor((difference % (1000 * 60)) / 1000);
    setSeconds(s);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      if (isFinished) return;

      if (!isCountdownToEnd && now < startDate) {
        const difference = startDate.getTime() - now.getTime();
        updateCountdown(difference);
      } else if (!isCountdownToEnd && now >= startDate) {
        setIsCountdownToEnd(true);
      } else if (isCountdownToEnd && now < endDate) {
        const difference = endDate.getTime() - now.getTime();
        updateCountdown(difference);
      } else {
        setIsFinished(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isCountdownToEnd, isFinished]);

  return (
    <div className="flex justify-center items-center gap-10 text-black">
      <h3 className="text-center text-4xl">
        {isFinished ? "ВРЕМЯ ЗАКОНЧИЛОСЬ" : "ОСТАЛОСЬ ВРЕМЕНИ"}
      </h3>
      <section className="flex justify-center items-center h-screen">
        <div className="flex space-x-4">
          <div className="text-center">
            <span className="block text-2xl">{days}</span>
            <span className="text-sm">День</span>
          </div>
          <div className="text-center">
            <span className="block text-2xl">{hours}</span>
            <span className="text-sm">Час</span>
          </div>
          <div className="text-center">
            <span className="block text-2xl">{minutes}</span>
            <span className="text-sm">Минут</span>
          </div>
          <div className="text-center">
            <span className="block text-2xl">{seconds}</span>
            <span className="text-sm">Секунд</span>
          </div>
        </div>
      </section>
    </div>
  );
}

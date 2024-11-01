'use client'
import { useState, useEffect } from "react";
import { start_Date, end_Date } from "../../api/dates";
import CountdownDisplay from "../countdown/page";

export default function CountdownLogic() {

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const updateCountdown = (difference : number) => {
    const d = Math.floor(difference / (1000 * 60 * 60 * 24));
    setDays(d);

    const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
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

      if (now < start_Date) {
        updateCountdown(start_Date.getTime() - now.getTime());
      } else if (now < end_Date) {
        updateCountdown(end_Date.getTime() - now.getTime());
      } else {
        setIsFinished(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [start_Date, end_Date, isFinished]);

  return (
    <CountdownDisplay
      days={days}
      hours={hours}
      minutes={minutes}
      seconds={seconds}
      isFinished={isFinished}
    />
  );
}

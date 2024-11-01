import React from "react";

interface CountdownDisplayProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isFinished: boolean;
}

const CountdownDisplay: React.FC<CountdownDisplayProps> = ({
  days,
  hours,
  minutes,
  seconds,
  isFinished,
}) => {
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
};

export default CountdownDisplay;

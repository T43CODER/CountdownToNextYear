import { useEffect, useState } from "react";
import "./styles/styles.css";

type TimeElapsedType = {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  diffInMsPercent: number;
};

type TimeElapsedPercentageType = {
  monthsPercent: number;
  daysPercent: number;
  hoursPercent: number;
  minutesPercent: number;
  secondsPercent: number;
};

function App() {
  function dateDifference(): TimeElapsedType {
    const year: number = new Date().getFullYear();
    const startOfYear: Date = new Date(year, 0, 1);
    const startDate: Date = startOfYear;
    const endDate: Date = new Date();

    let diffInMs: number = endDate.getTime() - startDate.getTime();

    const totalDaysInYear =
      year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 366 : 365;
    const totalMsInYear = totalDaysInYear * 24 * 60 * 60 * 1000;

    const diffInMsPercent = (diffInMs / totalMsInYear) * 100;

    let months =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());

    let tempDate = new Date(startDate);
    tempDate.setMonth(tempDate.getMonth() + months);
    if (tempDate > endDate) {
      months--;
      tempDate.setMonth(tempDate.getMonth() - 1);
    }

    diffInMs = endDate.getTime() - tempDate.getTime();

    const seconds = Math.floor((diffInMs / 1000) % 60);
    const minutes = Math.floor((diffInMs / (1000 * 60)) % 60);
    const hours = Math.floor((diffInMs / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    return { months, days, hours, minutes, seconds, diffInMsPercent };
  }

  function calculateElapsedPercentages(
    elapsedTime: TimeElapsedType
  ): TimeElapsedPercentageType {
    const now = new Date();

    const totalMonthsInYear = 12;
    const totalDaysInMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0
    ).getDate();
    const totalHoursInDay = 24;
    const totalMinutesInHour = 60;
    const totalSecondsInMinute = 60;

    const monthsPercent = (elapsedTime.months / totalMonthsInYear) * 100;
    const daysPercent = (elapsedTime.days / totalDaysInMonth) * 100;
    const hoursPercent = (elapsedTime.hours / totalHoursInDay) * 100;
    const minutesPercent = (elapsedTime.minutes / totalMinutesInHour) * 100;
    const secondsPercent = (elapsedTime.seconds / totalSecondsInMinute) * 100;

    return {
      monthsPercent,
      daysPercent,
      hoursPercent,
      minutesPercent,
      secondsPercent,
    };
  }

  const [timeElapsed, setTimeLeft] = useState<TimeElapsedType>(
    dateDifference()
  );
  const elapsedPercentages: TimeElapsedPercentageType =
    calculateElapsedPercentages(timeElapsed);

  useEffect(() => {
    const clockIntervalID = setInterval(
      () => setTimeLeft(dateDifference()),
      1000
    );

    return () => clearInterval(clockIntervalID);
  }, []);

  return (
    <div className="App">
      <div
        id="overallProgressBar"
        style={{ width: `${timeElapsed.diffInMsPercent}%` }}
      ></div>
      <div id="individualProgressHeader">
        <div>{timeElapsed.months} Months</div>
        <div>{timeElapsed.days} Days</div>
        <div>{timeElapsed.hours} Hours</div>
        <div>{timeElapsed.minutes} Minutes</div>
        <div>{timeElapsed.seconds} Seconds</div>
      </div>
      <div id="individualProgress">
        <div style={{ height: `${elapsedPercentages.monthsPercent}%` }}></div>
        <div style={{ height: `${elapsedPercentages.daysPercent}%` }}></div>
        <div style={{ height: `${elapsedPercentages.hoursPercent}%` }}></div>
        <div style={{ height: `${elapsedPercentages.minutesPercent}%` }}></div>
        <div style={{ height: `${elapsedPercentages.secondsPercent}%` }}></div>
      </div>
    </div>
  );
}

export default App;

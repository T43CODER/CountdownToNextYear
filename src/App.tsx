import { useEffect, useState } from "react";
import "./styles/styles.css";

type TimeLeftType = {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  diffInMsPercent: number;
};

function App() {
  const [timeLeft, setTimeLeft] = useState<TimeLeftType>({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    diffInMsPercent: 0,
  });

  useEffect(() => {
    function dateDifference(): TimeLeftType {
      const year: number = new Date().getFullYear();
      const startOfYear: Date = new Date(year, 0, 1); // January 1 of the current year
      const firstDayOfNextYear: Date = new Date(year + 1, 0, 1); // January 1 of the next year
      const startDate: Date = new Date();
      const endDate: Date = firstDayOfNextYear;

      // Get the total difference in milliseconds for remaining time in the year
      let diffInMs = endDate.getTime() - startDate.getTime();

      // Calculate total milliseconds in the current year (2024 has 366 days)
      const totalMsInYear = 366 * 24 * 60 * 60 * 1000;

      // Calculate milliseconds completed in the year so far
      const elapsedMs = startDate.getTime() - startOfYear.getTime();

      // Calculate percentage of year completed
      const diffInMsPercent = (elapsedMs / totalMsInYear) * 100;

      // Calculate months
      let months =
        (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        (endDate.getMonth() - startDate.getMonth());

      // Subtract the full months in milliseconds
      let tempDate = new Date(startDate);
      tempDate.setMonth(tempDate.getMonth() + months);
      if (tempDate > endDate) {
        months--;
        tempDate.setMonth(tempDate.getMonth() - 1);
      }

      // Calculate the difference after months
      diffInMs = endDate.getTime() - tempDate.getTime();

      // Convert milliseconds to days, hours, minutes, and seconds
      const seconds = Math.floor((diffInMs / 1000) % 60);
      const minutes = Math.floor((diffInMs / (1000 * 60)) % 60);
      const hours = Math.floor((diffInMs / (1000 * 60 * 60)) % 24);
      const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

      return { months, days, hours, minutes, seconds, diffInMsPercent };
    }

    const clockIntervalID = setInterval(
      () => setTimeLeft(dateDifference()),
      1000
    );

    return () => clearInterval(clockIntervalID);
  }, []);

  return (
    <div className="App">
      <div></div>
      <span id="progressbar" style={{ width: `${timeLeft.diffInMsPercent}%` }}>
        {`${timeLeft.months} months, ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds`}
      </span>
    </div>
  );
}

export default App;

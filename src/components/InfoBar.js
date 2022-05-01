import { useEffect, useState } from "react";

export default function InfoBar() {
  // set day of the week
  const dayIndex = new Date().getDay();
  const dayStr = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wensday",
    "Thursday",
    "Friday",
    "Saturday",
  ][dayIndex];
  const date = new Date().getDate();
  const monthIndex = new Date().getMonth();
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][monthIndex];
  // set btc price
  const [btc, setBtc] = useState();
  // Time
  const [time, setTime] = useState(new Date());
  const hours = time.getHours();
  const minutes = time.getMinutes().toString().padStart(2, 0);
  const seconds = time.getSeconds().toString().padStart(2, 0);

  // Get BTC price
  useEffect(() => {
    fetch("https://rest.coinapi.io/v1/assets/BTC", {
      headers: {
        "X-CoinAPI-Key": process.env.REACT_APP_CoinAPI_Key,
      },
    })
      .then((res) => res.json())
      .then((res) => setBtc(Math.round(res[0].price_usd)))
      .catch((err) => console.log(err));
  }, []);
  // SET TIME
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return ()=>{ clearInterval(interval)};
  }, []);

  return (
    <div className="flex flex-row justify-between">
      <p className="w-1/3 px-4 mt-4 text-orange-300 font-bold md:leading-8">
        {dayStr} {date} {month}
      </p>
      <div className="w-20 mt-4 clocks border border-hidden rounded-md flex items-center">
        <p className="mx-auto text-emerald-400 font-bold md:leading-9">
          {`${hours}:${minutes}:${seconds}`}
        </p>
      </div>
      {btc && (
        <p className="px-4 text-right w-1/3 px-4 mt-4 text-green-300 font-bold">
          BTC {btc} $
        </p>
      )}
    </div>
  );
}

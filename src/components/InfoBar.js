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

  console.log("dayStr", dayStr);
  return (
    <div className="flex flex-row justify-between">
      <p className="w-1/2 px-4 mt-4 text-orange-300 font-bold md:leading-8">
        {dayStr} {date} {month}
      </p>
      {btc && <p className="px-4 text-right w-1/2 px-4 mt-4 text-green-300 font-bold">BTC {btc} $</p>}
    </div>
  );
}

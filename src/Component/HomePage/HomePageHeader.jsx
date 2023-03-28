import React, { useEffect, useState } from "react";

const HomePageHeader = () => {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState();

  useEffect(() => {
    const date = new Date();
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedDate = date.toLocaleString("en-US", options);
    setTime(formattedDate);
  }, [count]);

  setInterval(() => {
    setCount(Number(count) + 1);
  }, 1000 * 60);

  return (
    <div>
      <h2 className="text-2xl font-semibold">
        Requisition By:{" "}
        <span className="text-lg font-normal">Md Hadiuzzaman</span>
      </h2>
      <h2 className="text-2xl font-semibold">
        Requisition Email:{" "}
        <span className="text-lg font-normal">hadiuzzamananik@gmail.com</span>
      </h2>
      <h2 className="text-2xl font-semibold">
        Company Name:{" "}
        <span className="text-lg font-normal">
          Mindshare Limited Bangladesh
        </span>
      </h2>
      <h2 className="text-2xl font-semibold">
        Unit: <span className="text-lg font-normal">IT</span>
      </h2>
      <h2 className="text-2xl font-semibold">
        REQ Date:{" "}
        <span className="text-lg font-normal">
          {/* <Clock /> */}
          {time}
        </span>
      </h2>
    </div>
  );
};

export default HomePageHeader;

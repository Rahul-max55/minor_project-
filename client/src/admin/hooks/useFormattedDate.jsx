import React from "react";

const useFormattedDate = (date) => {
  console.log(
    "🚀 ~ file: useFormattedDate.jsx:5 ~ useFormattedDate ~ date:",
    date
  );
  const dateVal = new Date(parseInt(date, 10));

  // Now `date` contains the actual date and time

  // You can format the date as needed, for example:
  const formattedDate = dateVal.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "UTC",
  });

  return [formattedDate];
};

export default useFormattedDate;

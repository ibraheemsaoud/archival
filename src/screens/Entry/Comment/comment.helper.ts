export const showSmartDate = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  const intervals = [
    {
      label: "year",
      seconds: 31536000,
    },
    {
      label: "month",
      seconds: 2592000,
    },
    {
      label: "day",
      seconds: 86400,
    },
    {
      label: "hour",
      seconds: 3600,
    },
    {
      label: "minute",
      seconds: 60,
    },
    {
      label: "second",
      seconds: 1,
    },
  ];
  let counter;
  for (let i = 0; i < intervals.length; i++) {
    counter = Math.floor(seconds / intervals[i].seconds);
    if (counter === 0 && i === intervals.length - 1) {
      return "Just now";
    }
    if (counter > 0) {
      return `${counter} ${intervals[i].label}${counter > 1 ? "s" : ""} ago`;
    }
  }
};

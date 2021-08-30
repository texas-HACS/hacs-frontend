import { date } from "joi";

// Return unixtime for JS Date
export function getTimeStamp(date) {
  return Math.round(date.getTime() / 1000);
}

export function isoDateToDateTimeString(isoDate) {
  let d = new Date(isoDate);

  return `${d.toLocaleDateString()} @${d.toLocaleTimeString("en-US")} CST`;
}

export function prettyDateTimeString(isoDate) {
  function join(t, a, s) {
    function format(m) {
      let f = new Intl.DateTimeFormat("en", m);
      return f.format(t);
    }
    return a.map(format).join(s);
  }

  let a = [
    { weekday: "long" },
    { month: "short", day: "numeric" },
    { year: "numeric" },
  ];
  let s = join(new Date(), a, ", ");
  return s;
}

export function renderStartAndEndDateTime(isoStartDate, isoEndDate) {
  // Start date only:                 DOW, MON DAY, YEAR at HH:MM AM/PM TIMEZONE
  // Start date & end date same day:  DOW, MON DAY, YEAR from HH1:MM1 AM/PM - HH2:MM2 AM/PM TIMEZONE
  // Start date & end date diff day:  DOW, MON DAY, YEAR, HH1:MM1 AM/PM - MON DAY, YEAR, HH2:MM2 AM/PM TIMEZONE
  if (!isoStartDate) {
    return null;
  }

  let dateFormat = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  let timeFormat = {
    hour: "numeric",
    minute: "numeric",
  };

  let startString = [dateFormat, timeFormat].map((f) =>
    isoDateToFormattedString(isoStartDate, f)
  );

  let timeString, endString;
  if (!isoEndDate) {
    timeString = startString.join(" at ");
  } else {
    let start = new Date(isoStartDate);
    let end = new Date(isoEndDate);
    if (datesAreOnSameDay(start, end)) {
      startString = startString.join(" from ");
      endString = isoDateToFormattedString(isoEndDate, timeFormat);
    } else {
      startString = startString.join(", ");
      endString = [dateFormat, timeFormat].map((f) =>
        isoDateToFormattedString(isoEndDate, f)
      ).join(", ");
    }
    timeString = `${startString} - ${endString}`;
  }
  return (
    timeString
    // +
    // " " 
    // +
    // new Date()
    //   .toLocaleTimeString("en-us", { timeZoneName: "short" })
    //   .split(" ")[2]
  );
}

function isoDateToFormattedString(isoDate, format) {
  return new Intl.DateTimeFormat("en", format).format(new Date(isoDate));
}

function datesAreOnSameDay(a, b) {
  return (
    !!a &&
    !!b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isoDateToDateString(isoDate) {
  let d = new Date(isoDate);
  return `${d.toLocaleDateString()}`;
}

export function newUid(prefix) {
  return `${prefix}_${new Date().getTime()}`;
}

export function containsAny(list, args) {
  return args.some((a) => list.indexOf(a) >= 0);
}

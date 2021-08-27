// Return unixtime for JS Date
function getTimeStamp(date) {
  return Math.round(date.getTime() / 1000);
}

function isoDateToDateTimeString(isoDate) {
  let d = new Date(isoDate);

  return `${d.toLocaleDateString()} @${d.toLocaleTimeString("en-US")} CST`;
}

function isoDateToDateString(isoDate) {
  let d = new Date(isoDate);

  return `${d.toLocaleDateString()}`;
}

function newUid(prefix) {
  return `${prefix}_${new Date().getTime()}`;
}

function containsAny(list, args) {
  return args.some((a) => list.indexOf(a) >= 0);
}

module.exports = { isoDateToDateTimeString, getTimeStamp, newUid, containsAny };

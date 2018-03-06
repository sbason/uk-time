import dateformat from 'dateformat';

function getLastSundayOfMonth(year, month) {
  const lastSunday = new Date();
  lastSunday.setYear(year);
  lastSunday.setUTCMonth(month);
  lastSunday.setUTCDate(31);

  while (lastSunday.getDay() !== 0) {
    const previousDate = lastSunday.getDate();
    lastSunday.setDate(previousDate - 1);
  }

  return lastSunday;
}

function getDateAtOneAM(date) {
  date.setUTCHours(1);
  date.setUTCMinutes(0);
  date.setUTCSeconds(0);
  date.setUTCMilliseconds(0);

  return date;
}

function getLastSundayOfMonthAtOneInMorning(year, month) {
  const lastSundayOfMonth = getLastSundayOfMonth(year, month);

  return getDateAtOneAM(lastSundayOfMonth).getTime();
}

function getBSTEndEpoch(year) {
  return getLastSundayOfMonthAtOneInMorning(year, 9);
}

function getBSTStartEpoch(year) {
  return getLastSundayOfMonthAtOneInMorning(year, 2);

}

function isBST(UTCEpoch, UTCYear) {
  const BSTStartEpoch = getBSTStartEpoch(UTCYear);
  const BSTEndEpoch = getBSTEndEpoch(UTCYear);

  if (UTCEpoch < BSTEndEpoch && UTCEpoch >= BSTStartEpoch) {
    return true;
  }
  return false;
}

function addHoursDuringBST(UTCDateTimeString, hoursToAdd) {
  const UTCTime = new Date(UTCDateTimeString);
  const UTCYear = UTCTime.getUTCFullYear();
  const UTCEpoch = UTCTime.getTime();

  if (isBST(UTCEpoch, UTCYear)) {
    const BSTDate = new Date(UTCEpoch + hoursToAdd * 60 * 60 * 1000);
    return BSTDate;
  }

  return UTCTime;
}

function getDateFormat(format) {
  const formatDate = format ? `UTC:${format}` : 'isoUtcDateTime';
  return formatDate;
}

function isValidDateTimeString(dateTimeString) {
  return !isNaN(Date.parse(dateTimeString));
}

function toUKTime(UTCDateTimeString, format) {
  if (!isValidDateTimeString(UTCDateTimeString)) {
    return;
  }
  return dateformat(addHoursDuringBST(UTCDateTimeString, 1), getDateFormat(format));
}

function fromUKTime(UTCDateTimeString, format) {
  if (!isValidDateTimeString(UTCDateTimeString)) {
    return;
  }
  return dateformat(addHoursDuringBST(UTCDateTimeString, -1), getDateFormat(format));
}

export { fromUKTime };
export { toUKTime };

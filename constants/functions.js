import { airports } from "./airports.List";

const getWordDate = (date) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let dateArray = date?.split("-");
  let newdateDateFormat = `${monthNames[dateArray[1] - 1]} ${dateArray[2]}, ${
    dateArray[0]
  }`;
  return newdateDateFormat;
};
function generateUniqueId() {
  const timestamp = Date.now().toString(36);
  const randomString = Math.random().toString(36).substr(2, 15);
  return `trx-${timestamp}-${randomString}`;
}

function getHoursWithMinutes(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const formattedTime = hours + "H " + remainingMinutes + "M";
  return formattedTime;
}

function getCityWithCode(code) {
  const temp = airports?.find((i) => i.city_code === code);
  if (temp !== undefined) return temp?.city;
}
function getAirportWithCode(code) {
  const temp = airports?.find((i) => i.city_code === code);
  if (temp !== undefined) return temp?.name;
}
function getCountryWithCode(code) {
  const temp = airports?.find((i) => i.city_code === code);
  if (temp !== undefined) return temp?.country;
}
function getSplitedTime(timeStamp) {
  const tempTime = timeStamp?.split("T");
  return tempTime[1].substring(0, 5);
}
export {
  getWordDate,
  generateUniqueId,
  getHoursWithMinutes,
  getAirportWithCode,
  getCityWithCode,
  getCountryWithCode,
  getSplitedTime,
};

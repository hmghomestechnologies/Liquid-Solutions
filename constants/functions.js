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
  let dateArray = date.split("-");
  let newdateDateFormat = `${monthNames[dateArray[1] - 1]} ${dateArray[2]}, ${
    dateArray[0]
  }`;
  return newdateDateFormat;
};
export { getWordDate };

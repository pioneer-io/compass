const parseDate = (dbDate) => {
  const date = new Date(dbDate);
  return date.toLocaleString();
}

export default parseDate;
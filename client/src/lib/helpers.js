const parseDate = (dbDate) => {
	const date = new Date(dbDate);
	return date.toLocaleString();
};

const truncate = (description) => {
	return description.length < 50 ? description : description.slice(0, 50);
};

module.exports = {
	parseDate,
	truncate
};

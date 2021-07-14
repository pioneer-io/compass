import { Redirect } from 'react-router-dom';

export const parseDate = (dbDate) => {
	const date = new Date(dbDate);
	return date.toLocaleString();
};

export const truncate = (description) => {
	return description.length < 50 ? description : description.slice(0, 50);
};

export const handleErrorRedirect = (error) => {
	if (error.includes('404')) {
		return <Redirect to="/404" />
	} else if (error.includes('500')) {
		return <Redirect to="/500" />
	} else {
		return <Redirect to="/error" />
	}
}
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

const filter = (logEvents, subject) => {
  return logEvents.filter(event => event.description.toLowerCase().includes(subject));
};

export const filterLogEvents = (logEvents, filterBy) => {
  switch(filterBy) {
    case 'all':
      return logEvents;
    case 'created':
      return filter(logEvents, 'created');
    case 'updated':
      return filter(logEvents, 'edited');
    case 'deleted':
      return filter(logEvents, 'deleted');
    case 'toggled on/off':
      return filter(logEvents, 'toggled');
    default:
      return logEvents;
  }
}
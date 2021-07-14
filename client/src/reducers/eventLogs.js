export default function logs(state = [], action) {
	switch (action.type) {
		case 'GET_LOGS_SUCCESS': {
			return action.logs;
		}
		case 'CREATE_EVENT_SUCCESS': {
			const newEvent = action.event;
			return state.concat(newEvent);
		}
		case 'SERVER_SIDE_LOGS_ERROR': {
			const error = action.error;
			console.log("LOGGING ERROR FROM LOGS REDUCER: ", error);
		}
		default:
			return state;
	}
}
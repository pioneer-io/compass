export default function logs(state = [], action) {
	switch (action.type) {
		case 'GET_LOGS_SUCCESS': {
			return action.logs;
		}
		case 'CREATE_EVENT_SUCCESS': {
			const newEvent = action.event;
			return state.concat(newEvent);
		}
		default:
			return state;
	}
}
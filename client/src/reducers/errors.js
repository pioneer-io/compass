export default function errors(state = [], action) {
	switch (action.type) {
		case 'SERVER_SIDE_FLAG_ERROR': {
			return action.error.message;
		}
    case 'SERVER_SIDE_LOGS_ERROR': {
      return action.error.message;
    }
		default:
			return state;
	}
}
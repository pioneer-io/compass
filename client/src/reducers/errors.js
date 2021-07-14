export default function errors(state = [], action) {
	switch (action.type) {
		case 'SERVER_SIDE_FLAG_ERROR': {
			console.log("EXECUTING REDUCER FOR FLAG");
			return action.error.message;
		}
		default:
			return state;
	}
}
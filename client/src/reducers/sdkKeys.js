export default function sdkKeys(state = "", action) {
	switch (action.type) {
		case 'FETCH_SDK_KEY_SUCCESS': {
			return action.action;
		}
		case 'UPDATE_SDK_KEY_SUCCESS': {
			return action.sdkKey;
		}
		default:
			return state;
	}
}
export default function sdkKey(state = "", action) {
	switch (action.type) {
		case 'FETCH_SDK_KEY_SUCCESS': {
			return action.sdkKey;
		}
		case 'UPDATE_SDK_KEY_SUCCESS': {
			return action.sdkKey;
		}
		default:
			return state;
	}
}
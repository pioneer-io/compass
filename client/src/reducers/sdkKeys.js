export default function sdkKey(state = "", action) {
	switch (action.type) {
		case 'FETCH_SDK_KEY_SUCCESS': {
			return action.sdkKey;
		}
		case 'CREATE_SDK_KEY_SUCCESS': {
			return action.sdkKey;
		}
		default:
			return state;
	}
}
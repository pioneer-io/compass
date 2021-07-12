export default function flags(state = [], action) {
	switch (action.type) {
		case 'FETCH_FLAGS_SUCCESS': {
			return action.flags;
		}
		case 'FETCH_FLAG_SUCCESS': {
			const fetchedFlag = action.flag; // { id: 2, title: 'example'.concat.}
			const exists = state.find(flag => flag.id === fetchedFlag.id);

			if (exists) {
				return state.map((flag) => (flag.id === fetchedFlag.id ? fetchedFlag : flag));
			} else {
				return state.concat(fetchedFlag);
			}
		}
		case 'CREATE_FLAG_SUCCESS': {
			const newFlag = action.flag;
			return state.concat(newFlag);
		}
		case 'UPDATE_FLAG_SUCCESS': {
			const updatedFlag = action.flag;
			return state.map((flag) => (flag.id !== updatedFlag.id ? flag : { ...updatedFlag }));
		}
		case 'DELETE_FLAG_SUCCESS': {
			const removedFlagId = action.flag.id;
			return state.filter((flag) => flag.id !== removedFlagId);
		}
		default:
			return state;
	}
}

import * as types from '../constants/ActionTypes';

export default function flagError(error) {
	console.log("EXECUTING FLAG ERROR ACTION CREATOR");
	return { type: types.SERVER_SIDE_FLAG_ERROR, error: error }
}

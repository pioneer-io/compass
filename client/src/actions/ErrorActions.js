import * as types from '../constants/ActionTypes';

export default function flagError(error) {
	return { type: types.SERVER_SIDE_FLAG_ERROR, error: error }
}

export default function logsError(error) {
  return { type: types.SERVER_SIDE_LOGS_ERROR, error: error }
}
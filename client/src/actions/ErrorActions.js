import * as types from '../constants/ActionTypes';

export function flagError(error) {
	return { type: types.SERVER_SIDE_FLAG_ERROR, error: error }
}

export function logsError(error) {
  return { type: types.SERVER_SIDE_LOGS_ERROR, error: error }
}

export function sdkKeyError(error) {
  return {type: types.SERVER_SIDE_SDK_KEY_ERROR, error: error}
}
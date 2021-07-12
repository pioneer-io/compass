import * as types from '../constants/ActionTypes';
import apiClient from '../lib/ApiClient';

export function createFlagRequest() {
	return { type: types.CREATE_FLAG_REQUEST };
}

export function fetchFlagRequest() {
	return { type: types.FETCH_FLAG_REQUEST };
}

export function fetchFlagSuccess(data) {
	// { flag: {}}
	return { type: types.FETCH_FLAG_SUCCESS, flag: data.flag };
}

export function fetchFlagsRequest() {
	return { type: types.FETCH_FLAGS_REQUEST };
}

export function fetchFlagsSuccess(flags) {
	return { type: types.FETCH_FLAGS_SUCCESS, flags: flags };
}

export function updateFlagRequest() {
	return { type: types.UPDATE_FLAG_REQUEST };
}

export function updateFlagSuccess(data) {
	return { type: types.UPDATE_FLAG_SUCCESS, flag: data.flag };
}

export function deleteFlagRequest() {
	return { type: types.DELETE_FLAG_REQUEST };
}

export function deleteFlagSuccess(flag) {
	return { type: types.DELETE_FLAG_SUCCESS, flag: flag };
}

export function createFlagSuccess(flag) {
	return { type: types.CREATE_FLAG_SUCCESS, flag: flag };
}

export function fetchFlags() {
	return function(dispatch) {
		dispatch(fetchFlagsRequest());
		apiClient.getFlags((data) => dispatch(fetchFlagsSuccess(data.flags)));
	};
}

export function updateFlag({ id, title, description, is_active }, callback) {
	const updatedInfo = { flag: { title, description, is_active } };
	return function(dispatch) {
		dispatch(updateFlagRequest());
		apiClient.updateFlag(id, updatedInfo, (data) => {
			dispatch(updateFlagSuccess(data));

			if (callback) {
				callback();
			}
		});
	};
}

export function getFlag(id) {
	return function(dispatch) {
		dispatch(fetchFlagRequest(id));
		apiClient.getFlag(id, (data) => {
			dispatch(fetchFlagSuccess(data));
		});

	};
}

export function deleteFlag(id, callback) {
	return function(dispatch) {
		dispatch(deleteFlagRequest());
		apiClient.deleteFlag(id, (data) => {
			console.log('delete flag success : ', data);
			dispatch(deleteFlagSuccess(data));

			if (callback) {
				callback();
			}
		});
	};
}

export function createFlag(data, callback) {
	return function(dispatch) {
		dispatch(createFlagRequest());
		apiClient.createFlag(data, (resData) => {
			dispatch(deleteFlagSuccess(resData));

			if (callback) {
				callback();
			}
		});
	};
}

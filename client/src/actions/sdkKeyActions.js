import * as types from '../constants/ActionTypes';
import apiClient from '../lib/ApiClient';
import { sdkKeyError } from './ErrorActions';

export function fetchSdkKeyRequest() {
	return {type: types.FETCH_SDK_KEY_REQUEST};
}

export function fetchSdkKeySuccess(data) {
	return { type: types.FETCH_SDK_KEY_SUCCESS, sdkKey: data.sdkKey}
}

export function createSdkKeyRequest() {
	return {type: types.CREATE_SDK_KEY_REQUEST};
}

export function createSdkKeySuccess(data) {
	return {type: types.CREATE_SDK_KEY_SUCCESS, sdkKey: data.sdkKey};
}

export function fetchSdkKey() {
  return function(dispatch) {
    dispatch(fetchSdkKeyRequest());
		apiClient.getSdkKey((data) => {
			dispatch(fetchSdkKeySuccess(data))
		})
		.catch(error => dispatch(sdkKeyError(error)))
  };
}

export function createNewSdkKey() {
	return function(dispatch) {
		dispatch(createSdkKeyRequest());
		console.log('hello')
		apiClient.createSdkKey(data => {
			console.log(`data from create sdk key: ${data}`)
			dispatch(createSdkKeySuccess(data))
		})
			.catch(error => dispatch(sdkKeyError(error)))
	};
}
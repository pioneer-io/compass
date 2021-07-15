import * as types from '../constants/ActionTypes';
import apiClient from '../lib/ApiClient';
import { sdkKeyError } from './ErrorActions';

export function fetchSdkKeyRequest() {
	return {type: types.FETCH_SDK_KEY_REQUEST};
}

export function fetchSdkKeySuccess(data) {
	return { type: types.FETCH_SDK_KEY_SUCCESS, sdkKey: data.sdkKey}
}


export function fetchSdkKey() {
  return function(dispatch) {
    dispatch(fetchSdkKeyRequest());
		apiClient.getSdkKey((data) => dispatch(fetchSdkKeySuccess(data)))
					   .catch(error => dispatch(sdkKeyError(error)))
  };
}
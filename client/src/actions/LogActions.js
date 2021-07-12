import * as types from "../constants/ActionTypes";
import apiClient from '../lib/ApiClient';

export function getLogsRequest() {
  return { type: types.GET_LOGS_REQUEST };
}

export function getLogsSuccess(logs) {
  return { type: types.GET_LOGS_SUCCESS, logs: logs };
}

export function fetchLogs() {
  return function(dispatch) {
    dispatch(getLogsRequest());
    apiClient.getLogs(data => {
      // data: [{}, {}]
      dispatch(getLogsSuccess(data))
    });
  }
}
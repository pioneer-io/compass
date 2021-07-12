import * as types from "../constants/ActionTypes";
import apiClient from '../lib/ApiClient';

export function getLogsRequest() {
  return { type: types.GET_LOGS_REQUEST };
}

export function getLogsSuccess(logs) {
  return { type: types.GET_LOGS_SUCCESS, logs: logs };
}

export function logFlagDeletionRequest() {
  return { type: types.LOG_FLAG_DELETION_REQUEST };
}

export function logFlagDeletionSuccess(logs) {
  return { type: types.LOG_FLAG_DELETION_SUCCESS, logs: logs};
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

export function logFlagDeletion(flag) {
  return function(dispatch) {
    dispatch(logFlagDeletionRequest());
    apiClient.logFlagDeletion(flag, data => {
      dispatch(logFlagDeletionSuccess(data));
    });
  }
}
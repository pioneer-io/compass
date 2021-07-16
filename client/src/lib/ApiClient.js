import axios from 'axios';
import * as routes from '../constants/ApiRoutes';

function unwrapData(response) {
	return response.data;
}

function logError(err) {
	console.error("Error: ", err);
	throw err;
}

const apiClient = {
	getFlags   : function(callback) {
		return axios.get(routes.FLAGS_INDEX_URL).then(unwrapData).then(callback).catch(logError);
	},
	getLogs    : function(callback) {
		return axios.get(routes.GET_EVENTS_LOG_URL).then(unwrapData).then(callback).catch(logError);
	},
	updateFlag : function(id, flagData, callback) {
		return axios.put(`${routes.UPDATE_FLAG_URL}${id}`, flagData).then(unwrapData).then(callback).catch(logError);
	},
	getFlag    : function(id, callback) {
		return axios.get(`${routes.GET_FLAG_URL}${id}`).then(unwrapData).then(callback).catch(logError);
	},
	deleteFlag : function(flag, callback) {
		return axios.delete(`${routes.DELETE_FLAG_URL}${flag.id}`, flag).then(unwrapData).then(callback).catch(logError);
	},
	createFlag : function(flagData, callback) {
		return axios.post(routes.CREATE_FLAG_URL, flagData).then(unwrapData).then(callback).catch(logError);
	},
	logFlagDeletion : function(flagData, callback) {
		return axios.post(routes.POST_EVENTS_LOG_URL, flagData).then(unwrapData).then(callback).catch(logError);
	},
	getSdkKey : function(callback) {
		return axios.get(routes.GET_SDK_KEY_URL).then(unwrapData).then(callback).catch(logError);
	},
	createSdkKey : function(callback) {
		return axios.get(routes.CREATE_SDK_KEY_URL).then(unwrapData).then(callback).catch(logError);
	}
};

export default apiClient;

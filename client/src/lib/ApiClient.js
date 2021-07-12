import axios from 'axios';
import * as routes from '../constants/ApiRoutes';

function logError(errorResponse) {
	const response = errorResponse.response;

	if (response && response.data && response.data.error) {
		console.error(`HTTP Error: ${response.data.error}`);
	} else {
		console.error('Error: ', errorResponse);
	}
}

function unwrapData(response) {
	//console.log("unwrapping data: ", response);
	return response.data;
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
	deleteFlag : function(id, callback) {
		return axios.delete(`${routes.DELETE_FLAG_URL}${id}`).then(unwrapData).then(callback).catch(logError);
	},
	createFlag : function(flagData, callback) {
		return axios.post(routes.CREATE_FLAG_URL, flagData).then(unwrapData).then(callback).catch(logError);
	}
};

export default apiClient;

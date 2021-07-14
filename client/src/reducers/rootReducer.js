import { combineReducers } from 'redux';
import flags from './flags';
import eventLogs from  './eventLogs';
import errors from './errors';

const rootReducer = combineReducers({ flags, eventLogs, errors });

export default rootReducer;
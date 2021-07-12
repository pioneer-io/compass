import { combineReducers } from 'redux';
import flags from './flags';
import eventLogs from  './eventLogs';

const rootReducer = combineReducers({ flags, eventLogs });

export default rootReducer;
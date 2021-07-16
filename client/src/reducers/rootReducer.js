import { combineReducers } from 'redux';
import flags from './flags';
import eventLogs from  './eventLogs';
import errors from './errors';
import sdkKey from './sdkKeys'

const rootReducer = combineReducers({ flags, eventLogs, errors, sdkKey });

export default rootReducer;
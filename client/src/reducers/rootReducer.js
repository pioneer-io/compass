import { combineReducers } from 'redux';
import flags from './flags';
import eventLogs from  './eventLogs';
import errors from './errors';
import sdkKeys from './sdkKeys'

const rootReducer = combineReducers({ flags, eventLogs, errors, sdkKeys });

export default rootReducer;
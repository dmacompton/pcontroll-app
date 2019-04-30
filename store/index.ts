import { combineReducers } from 'redux';
import auth from './auth/reducer';
import count from './reducers/countReducer';

const rootReducer = combineReducers({ auth, count });

export default rootReducer;

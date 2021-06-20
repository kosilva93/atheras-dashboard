import { combineReducers } from 'redux';
import datasetReducer from './dataset';
import usersReducer from './users';
import uiReducer from './ui';
import stationsReducer from './stations';

export default combineReducers({
    dataset: datasetReducer,
    stations: stationsReducer,
    users: usersReducer,
    ui: uiReducer
})

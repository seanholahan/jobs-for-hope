import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { searchJobListing, requestJobs, requestOrgs, changeEmploymentType, changeDistance } from './store/reducers'

const initialState= {}

const rootReducer = combineReducers({ searchJobListing, requestJobs, requestOrgs, changeEmploymentType, changeDistance });

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;

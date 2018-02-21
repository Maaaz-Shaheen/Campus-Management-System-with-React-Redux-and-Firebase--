import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import jobReducer from '../reducers/jobs';
import studentsReducer from '../reducers/students';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Store Creation
export default () => {
    const store = createStore(
        combineReducers({
            auth : authReducer,
            jobs : jobReducer,
            studentsData : studentsReducer,
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
};

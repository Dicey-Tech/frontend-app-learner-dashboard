import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import courses from './reducers/courses';
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger();
const store = createStore(courses, applyMiddleware(thunk,loggerMiddleware));

export default store;

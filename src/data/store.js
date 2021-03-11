import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import courses from './reducers/courses';

const loggerMiddleware = createLogger();
const store = createStore(courses, applyMiddleware(thunk, loggerMiddleware));

export default store;

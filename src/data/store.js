import { createStore } from 'redux';
import courses from './reducers/courses';

const store = createStore(courses);

export default store;

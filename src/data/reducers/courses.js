import {
  GOT_COURSES,
  STARTED_FETCHING_COURSES,
  ERROR_FETCHING_COURSES,
  GOT_STUDENT_COURSES,
} from '../constants/actionTypes';

const initialState = {
  courses: [],
  startedFetching: false,
  finishedFetching: false,
  errorFetching: false,
  showSuccess: false,
  showCoursesSpinner: true,
  totalCourses: 0,
};

const courses = (state = initialState, action) => {
  switch (action.type) {
    case GOT_COURSES:
      return {
        ...state,
        finishedFetching: true,
        errorFetching: false,
        showSpinner: false,
      };
    case GOT_STUDENT_COURSES:
      return {
        ...state,
        courses: action.courses,
        totalCourses: action.totalCourses,
        showCoursesSpinner: false,
      };
    case STARTED_FETCHING_COURSES:
      return {
        ...state,
        startedFetching: true,
        finishedFetching: false,
        showCoursesSpinner: true,
        showBookmarksSpinner: true,
      };
    case ERROR_FETCHING_COURSES:
      return {
        ...state,
        finishedFetching: true,
        errorFetching: true,
        showBookmarksSpinner: false,
        showCoursesSpinner: false,
      };
    default:
      return state;
  }
};

export { initialState as initialCoursesState };
export default courses;

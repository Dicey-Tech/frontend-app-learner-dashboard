import {
  GOT_COURSES,
  STARTED_FETCHING_COURSES,
  ERROR_FETCHING_COURSES,
  GOT_STUDENT_COURSES,
  GOT_COURSES_TEACHING,
  GOT_BOOKMARKS,
} from '../constants/actionTypes';

const initialState = {
  courses: [],
  bookmarks: [],
  coursesTeaching: [],
  hasCoursesTeaching: false,
  startedFetching: false,
  finishedFetching: false,
  errorFetching: false,
  showSuccess: false,
  showSpinner: true,
  totalCourses: 0,
  totalBookmarks: 0,
  totalCoursesTeaching: 0,
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
        totalCourses: action.totalCoursesCount,
      };
    case GOT_BOOKMARKS:
      return {
        ...state,
        bookmarks: action.bookmarks,
        totalBookmarks: action.totalBookmarksCount,
      };
    case GOT_COURSES_TEACHING:
      return {
        ...state,
        hasCoursesTeaching: true,
        coursesTeaching: action.coursesTeaching,
        totalCoursesTeaching: action.totalCoursesTeaching,
      };
    case STARTED_FETCHING_COURSES:
      return {
        ...state,
        startedFetching: true,
        finishedFetching: false,
        showSpinner: true,
      };
    case ERROR_FETCHING_COURSES:
      return {
        ...state,
        finishedFetching: true,
        errorFetching: true,
      };
    default:
      return state;
  }
};

export { initialState as initialCoursesState };
export default courses;

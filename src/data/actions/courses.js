import EcomApiService from '../services/EcomApiService';
import {
  GOT_COURSES,
  STARTED_FETCHING_COURSES,
  ERROR_FETCHING_COURSES,
  GOT_STUDENT_COURSES,
  GOT_COURSES_TEACHING,
  GOT_BOOKMARKS,
} from '../constants/actionTypes';

/* eslint-disable */
async function getCoursesInformation(data) {
    for (const courseId of data) {  
      try {
        const courseInfo = await EcomApiService.fetchCourseInfo(courseId);
        data.coursesTeaching.push(courseInfo);
      }
      catch(error) {

      }
    }
  return data;
}
/* eslint-enable */

const fetchCourses = (user) => (
  (dispatch) => {
    // dispatch getting student courses
    dispatch({ type: STARTED_FETCHING_COURSES });
    return EcomApiService.fetchStudentCourses()
      .then(response => {
        const dat = response.data;
        dispatch({
          type: GOT_STUDENT_COURSES,
          courses: dat,
          totalCourses: dat.length,
        });
        return EcomApiService.fetchStudentBookmarks();
      }).then(response => {
        /* only get the first 10 bookmarks?? */
        const dat = response.data;
        dispatch({
          type: GOT_BOOKMARKS,
          bookmarks: dat.results,
          totalBookmarksCount: dat.count,
        });
        /* we now need to get the current user and if the user has role "staff" get those
               otherwise we are done. */
        // const user = getAuthenticatedUser();
        if (user.roles.includes('staff')) {
          return EcomApiService.fetchStaffCourses(user.username, 'staff');
        }

        dispatch({ type: GOT_COURSES });
        return null;
      })
      .then(response => {
        /* we get the first page only so then we need to loop over each and fetch the course info */
        const dat = response.data;
        dat.coursesTeaching = [];
        return getCoursesInformation(dat.results);
      })
      .then((data) => {
        dispatch({
          type: GOT_COURSES_TEACHING,
          coursesTeaching: data,
        });
        dispatch({ type: GOT_COURSES });
        return null;
      })
      .catch(() => {
        dispatch({ type: ERROR_FETCHING_COURSES });
      });
  }
);

export default fetchCourses;

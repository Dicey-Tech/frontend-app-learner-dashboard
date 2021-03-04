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
async function getCoursesInformation(courses) {
    for (const courseInfo of courses) {  
      try {
        const courseData = await EcomApiService.fetchCourseInfo(courseInfo.courseId);
        courseInfo.name = courseData.name
        courseInfo.start = courseData.start
        courseInfo.description = courseData.short_description
        courseInfo.media = courseData.media
      }
      catch(error) {

      }
    }
  return courses;
}
/* eslint-enable */

const fetchCourses = (user) => (
  (dispatch) => {
    // dispatch getting student courses
    dispatch({ type: STARTED_FETCHING_COURSES });
    return EcomApiService.fetchStudentCourses()
      .then(response => {
        const dat = response.data;
        // we have to get more data so make a vector here and get courses information
        // plently of promises here
        const courses = [];
        dat.foreach(element => {
          courses.push({ courseId: element.course_details.course_id });
        });
        return getCoursesInformation(courses);
      }).then(coursesData => {
        dispatch({
          type: GOT_STUDENT_COURSES,
          courses: coursesData,
          totalCourses: coursesData.length,
        });
        return EcomApiService.fetchStudentBookmarks();
      }).then(response => {
        /* only get the first 10 bookmarks?? */
        const dat = response.data;
        const bookmarks = [];
        dat.results.foreach(element => {
          bookmarks.push({ courseId: element.course_id });
        });
        return getCoursesInformation(bookmarks);
      })
      .then(coursesData => {
        dispatch({
          type: GOT_BOOKMARKS,
          bookmarks: coursesData,
          totalBookmarksCount: coursesData.count,
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
        const coursesTeaching = [];
        dat.results.foreach(element => {
          coursesTeaching.push({ courseId: element });
        });
        return getCoursesInformation(coursesTeaching);
      })
      .then(coursesData => {
        dispatch({
          type: GOT_COURSES_TEACHING,
          coursesTeaching: coursesData,
          totalCoursesTeaching: coursesData.lenght,
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

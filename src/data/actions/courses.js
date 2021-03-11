import EcomApiService from '../services/EcomApiService';
import {
  GOT_COURSES,
  STARTED_FETCHING_COURSES,
  ERROR_FETCHING_COURSES,
  GOT_STUDENT_COURSES,
  GOT_BOOKMARKS,
} from '../constants/actionTypes';

/* eslint-disable */
async function getCoursesInformation(courses) {
    for (const courseInfo of courses) {  
      try {
        const courseData = await EcomApiService.fetchCourseInfo(courseInfo.courseId);
        courseInfo.name = courseData.data.name
        courseInfo.start = courseData.data.start
        courseInfo.description = courseData.data.short_description
        courseInfo.media = courseData.data.media.image.small
        courseInfo.courseTabs = courseData.data.tabs //.find(({type}) => type === 'courseware').url
      }
      catch(error) {

      }
    }
  return courses;
}
/* eslint-enable */

const fetchCourses = () => (
  (dispatch) => {
    // dispatch getting student courses
    dispatch({ type: STARTED_FETCHING_COURSES });
    return EcomApiService.fetchStudentCourses()
      .then(response => {
        const dat = response.data;
        // we have to get more data so make a vector here and get courses information
        // plently of promises here
        const courses = [];
        dat.forEach(element => {
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
        dat.results.forEach(element => {
          bookmarks.push({ courseId: element.course_id });
        });
        return getCoursesInformation(bookmarks);
      })
      .then(coursesData => {
        dispatch({
          type: GOT_BOOKMARKS,
          bookmarks: coursesData,
          totalBookmarks: coursesData.length,
        });
        dispatch({ type: GOT_COURSES });
      })
      .catch(() => {
        dispatch({ type: ERROR_FETCHING_COURSES });
      });
  }
);

export default fetchCourses;

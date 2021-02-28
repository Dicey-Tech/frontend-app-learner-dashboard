import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { configuration } from '../../config';

class EcomApiService {
    static baseUrl = configuration.ECOMMERCE_BASE_URL;

    static fetchStudentCourses() {
      /* fetch all the courses where current user is a student */
      const enrollmentUrl = `${EcomApiService.baseUrl}/api/enrollment/v1/enrollment`;

      return getAuthenticatedHttpClient().get(enrollmentUrl);
    }

    static fetchStudentBookmarks() {
      /* fetch the first 10 bookmarks of the current user */

      const boomakrUrl = `${EcomApiService.baseUrl}/api/bookmarks/v1/bookmarks`;

      return getAuthenticatedHttpClient().get(boomakrUrl);
    }

    static fetchStaffCourses(userId, role) {
      /* fetch the 1st 10 courses the staff are teaching */
      /* this API seems to only work with the specific user_id and role passed
           eventhough the documentation says they are optional */
      const queryParms = `username=${encodeURIComponent(userId)}&role=${encodeURIComponent(role)}`;

      const staffCoursesUrl = `${EcomApiService.baseUrl}/api//Course/v1/course_id/?${queryParms}`;

      return getAuthenticatedHttpClient().get(staffCoursesUrl);
    }

    static fetchCourseInfo(courseId) {
      /* given a course identifier fetch the minimal information needed for the dashboard */

      const queryParms = 'fields=id,name,short_description';

      const courseInfoUrl = `${EcomApiService.baseUrl}/api/courseware/course/${courseId}/?${queryParms}`;

      return getAuthenticatedHttpClient().get(courseInfoUrl);
    }
}

export default EcomApiService;

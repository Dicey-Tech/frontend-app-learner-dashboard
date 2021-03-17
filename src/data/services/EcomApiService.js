import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { configuration } from '../../config';

class EcomApiService {
    static baseUrl = configuration.LMS_BASE_URL;

    static fetchStudentCourses() {
      /* fetch all the courses where current user is a student */
      const enrollmentUrl = `${EcomApiService.baseUrl}/api/enrollment/v1/enrollment`;

      return getAuthenticatedHttpClient().get(enrollmentUrl);
    }

    static fetchCourseInfo(courseId) {
      /* given a course identifier fetch the minimal information needed for the dashboard */

      const queryParms = 'fields=id,name,short_description,media,tabs';

      const courseInfoUrl = `${EcomApiService.baseUrl}/api/courseware/course/${courseId}/?${queryParms}`;

      return getAuthenticatedHttpClient().get(courseInfoUrl);
    }
}

export default EcomApiService;

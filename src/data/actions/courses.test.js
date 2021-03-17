import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';

import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { configuration } from '../../config';
import fetchCourses from './courses';
import {
  GOT_COURSES,
  GOT_STUDENT_COURSES,
  STARTED_FETCHING_COURSES,
} from '../constants/actionTypes';

const mockStore = configureMockStore([thunk]);

jest.mock('@edx/frontend-platform/auth');
const axiosMock = new MockAdapter(axios);
getAuthenticatedHttpClient.mockReturnValue(axios);
axios.isAccessTokenExpired = jest.fn();
axios.isAccessTokenExpired.mockReturnValue(false);

describe('actions', () => {
  afterEach(() => {
    axiosMock.reset();
  });

  describe('fetchCourses', () => {
    const fetchCoursesUrl = `${configuration.LMS_BASE_URL}/api/enrollment/v1/enrollment`;
    const fetchDemoCourseUrl = `${configuration.LMS_BASE_URL}/api/courseware/course/course-v1:edX+DemoX+Demo_Course/?fields=id,name,short_description,media,tabs`;
    const fetchDummyCourseUrl = `${configuration.LMS_BASE_URL}/api/courseware/course/course-v1:edX+E2E-101+course/?fields=id,name,short_description,media,tabs`;
    const courseData = [
      {
        created: '2020-12-11T15:45:37.835588Z',
        mode: 'audit',
        course_details: {
          course_id: 'course-v1:edX+DemoX+Demo_Course',
          course_name: 'Demonstration Course',
        },
        user: 'edx',
      },
    ];
    const courseDetail = {
      id: 'course-v1:edX+DemoX+Demo_Course',
      media: {
        course_image: {
          uri: '/asset-v1:edX+DemoX+Demo_Course+type@asset+block@images_course_image.jpg',
        },
        course_video: {
          uri: null,
        },
        image: {
          raw: 'http://localhost:18000/asset-v1:edX+DemoX+Demo_Course+type@asset+block@images_course_image.jpg',
          small: 'http://localhost:18000/asset-v1:edX+DemoX+Demo_Course+type@asset+block@images_course_image.jpg',
          large: 'http://localhost:18000/asset-v1:edX+DemoX+Demo_Course+type@asset+block@images_course_image.jpg',
        },
      },
      name: 'Demonstration Course',
      number: 'DemoX',
      start: '2013-02-05T05:00:00Z',
      short_description: null,
      tabs: [
        {
          title: 'Course',
          slug: 'courseware',
          priority: 0,
          type: 'courseware',
          url: '/courses/course-v1:edX+DemoX+Demo_Course/course/',
        },
        {
          title: 'Progress',
          slug: 'progress',
          priority: 1,
          type: 'progress',
          url: '/courses/course-v1:edX+DemoX+Demo_Course/progress',
        },
        {
          title: 'Discussion',
          slug: 'discussion',
          priority: 2,
          type: 'discussion',
          url: '/courses/course-v1:edX+DemoX+Demo_Course/discussion/forum/',
        },
        {
          title: 'Wiki',
          slug: 'wiki',
          priority: 3,
          type: 'wiki',
          url: '/courses/course-v1:edX+DemoX+Demo_Course/course_wiki',
        },
        {
          title: 'Instructor',
          slug: 'instructor',
          priority: 4,
          type: 'instructor',
          url: '/courses/course-v1:edX+DemoX+Demo_Course/instructor',
        },
      ],
    };
    const dummyDetail = {
      id: 'course-v1:edX+E2E-101+course',
      media: {
        course_image: {
          uri: '/asset-v1:edX+E2E-101+course+type@asset+block@images_course_image.jpg',
        },
        course_video: {
          uri: null,
        },
        image: {
          raw: 'http://localhost:18000/asset-v1:edX+E2E-101+course+type@asset+block@images_course_image.jpg',
          small: 'http://localhost:18000/asset-v1:edX+E2E-101+course+type@asset+block@images_course_image.jpg',
          large: 'http://localhost:18000/asset-v1:edX+E2E-101+course+type@asset+block@images_course_image.jpg',
        },
      },
      name: 'Dummy Course',
      number: 'DemoX',
      start: '2016-02-05T05:00:00Z',
      short_description: null,
      tabs: [
        {
          title: 'Course',
          slug: 'courseware',
          priority: 0,
          type: 'courseware',
          url: '/courses/course-v1:edX+E2E-101+course/course/',
        },
        {
          title: 'Progress',
          slug: 'progress',
          priority: 1,
          type: 'progress',
          url: '/courses/course-v1:edX+E2E-101+course/progress',
        },
        {
          title: 'Discussion',
          slug: 'discussion',
          priority: 2,
          type: 'discussion',
          url: '/courses/course-v1:edX+E2E-101+course/discussion/forum/',
        },
        {
          title: 'Wiki',
          slug: 'wiki',
          priority: 3,
          type: 'wiki',
          url: '/courses/course-v1:edX+E2E-101+course/course_wiki',
        },
        {
          title: 'Instructor',
          slug: 'instructor',
          priority: 4,
          type: 'instructor',
          url: '/courses/course-v1:edX+E2E-101+course/instructor',
        },
      ],
    };

    // this is the same for bookmarks as well
    const demoResult = [{
      courseId: 'course-v1:edX+DemoX+Demo_Course',
      name: 'Demonstration Course',
      start: '2013-02-05T05:00:00Z',
      description: null,
      media: 'http://localhost:18000/asset-v1:edX+DemoX+Demo_Course+type@asset+block@images_course_image.jpg',
      courseTabs: [
        {
          title: 'Course',
          slug: 'courseware',
          priority: 0,
          type: 'courseware',
          url: '/courses/course-v1:edX+DemoX+Demo_Course/course/',
        },
        {
          title: 'Progress',
          slug: 'progress',
          priority: 1,
          type: 'progress',
          url: '/courses/course-v1:edX+DemoX+Demo_Course/progress',
        },
        {
          title: 'Discussion',
          slug: 'discussion',
          priority: 2,
          type: 'discussion',
          url: '/courses/course-v1:edX+DemoX+Demo_Course/discussion/forum/',
        },
        {
          title: 'Wiki',
          slug: 'wiki',
          priority: 3,
          type: 'wiki',
          url: '/courses/course-v1:edX+DemoX+Demo_Course/course_wiki',
        },
        {
          title: 'Instructor',
          slug: 'instructor',
          priority: 4,
          type: 'instructor',
          url: '/courses/course-v1:edX+DemoX+Demo_Course/instructor',
        },
      ],
    }];
    it('dispatches when fetching course data', () => {
      const expectedActions = [
        { type: STARTED_FETCHING_COURSES },
        {
          type: GOT_STUDENT_COURSES,
          courses: demoResult,
          totalCourses: 1,
        },
        { type: GOT_COURSES },
      ];
      const store = mockStore({});
      axiosMock.onGet(fetchCoursesUrl)
        .replyOnce(200, JSON.stringify(courseData));
      axiosMock.onGet(fetchDemoCourseUrl)
        .replyOnce(200, JSON.stringify(courseDetail));
      axiosMock.onGet(fetchDummyCourseUrl)
        .replyOnce(200, JSON.stringify(dummyDetail));

      return store.dispatch(fetchCourses())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});

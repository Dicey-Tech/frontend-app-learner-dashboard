import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';

import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { configuration } from '../../config';
import fetchCourses from './courses';
import {
  GOT_BOOKMARKS,
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
    const fetchCoursesUrl = `${configuration.ECOMMERCE_BASE_URL}/api/enrollment/v1/enrollment`;
    const fetchBookmarksUrl = `${configuration.ECOMMERCE_BASE_URL}/api/bookmarks/v1/bookmarks`;
    const fetchDemoCourseUrl = `${configuration.ECOMMERCE_BASE_URL}/api/courseware/course/course-v1:edX+DemoX+Demo_Course/?fields=id,name,short_description,media`;
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
    const bookmarkData = {
      next: null,
      previous: null,
      count: 0,
      num_pages: 1,
      current_page: 1,
      start: 0,
      results: [
        { course_id: 'course-v1:edX+DemoX+Demo_Course' },
      ],
    };
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
    };
    // this is the same for bookmarks as well
    const courseResult = [{
      courseId: 'course-v1:edX+DemoX+Demo_Course',
      name: 'Demonstration Course',
      start: '2013-02-05T05:00:00Z',
      description: null,
      media: 'http://localhost:18000/asset-v1:edX+DemoX+Demo_Course+type@asset+block@images_course_image.jpg',
    }];

    it('dispatches when fetching course data', () => {
      const expectedActions = [
        { type: STARTED_FETCHING_COURSES },
        {
          type: GOT_STUDENT_COURSES,
          courses: courseResult,
          totalCourses: 1,
        },
        {
          type: GOT_BOOKMARKS,
          bookmarks: courseResult,
          totalBookmarksCount: 1,
        },
        { type: GOT_COURSES },
      ];
      const store = mockStore({});
      axiosMock.onGet(fetchCoursesUrl)
        .replyOnce(200, JSON.stringify(courseData));
      axiosMock.onGet(fetchBookmarksUrl)
        .replyOnce(200, JSON.stringify(bookmarkData));
      axiosMock.onGet(fetchDemoCourseUrl)
        .reply(200, JSON.stringify(courseDetail));

      return store.dispatch(fetchCourses())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});

import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';

import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { configuration } from '../../config';
import fetchCourses from './courses';
import {
  GOT_COURSES_TEACHING,
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
    const fetchTeachingUrl = `${configuration.ECOMMERCE_BASE_URL}/api//Course/v1/course_id/?username=edx&role=staff`;
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

      ],
    };
    const coursesTeaching = {
      results: [
        // 'course-v1:edX+DemoX+Demo_Course',
      ],
      pagination: {
        next: null,
        previous: null,
        count: 0,
        num_pages: 1,
      },
    };

    it('dispatches when fetching course data', () => {
      const expectedActions = [
        { type: STARTED_FETCHING_COURSES },
        {
          type: GOT_STUDENT_COURSES,
          courses: courseData,
          totalCourses: 1,
        },
        {
          type: GOT_BOOKMARKS,
          bookmarks: [],
          totalBookmarksCount: 0,
        },
        {
          type: GOT_COURSES_TEACHING,
          coursesTeaching: [],
        },
        { type: GOT_COURSES },
      ];
      const store = mockStore({});
      const user = { roles: ['staff'], username: 'edx' };
      axiosMock.onGet(fetchCoursesUrl)
        .replyOnce(200, JSON.stringify(courseData));
      axiosMock.onGet(fetchBookmarksUrl)
        .replyOnce(200, JSON.stringify(bookmarkData));
      axiosMock.onGet(fetchTeachingUrl)
        .replyOnce(200, JSON.stringify(coursesTeaching));

      return store.dispatch(fetchCourses(user))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});

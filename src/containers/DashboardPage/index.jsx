import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from '@edx/paragon';
import CardSection from '../../components/Dashboard/CardSection';

// replaced by service call
/*
const cardData = [
  {
    name: 'Course-1',
    ageGroup: 'Age: 12-15',
    length: '25 hours',
    description: 'This course teaches students how to create a 3D printed model',
  },
  {
    name: 'Course-2',
    ageGroup: 'Age: 12-15',
    length: '25 hours',
    description: 'This course teaches students how to create a 3D printed model',
  },
];
*/
export function DashboardPage({
  courses, bookmarks, coursesTeaching, hasCoursesTeaching,
  totalCourses, totalBookmarks, totalCoursesTeaching, showSpinner,
}) {
  return (
    <main>
      {showSpinner && <div className="spinner-overlay"><Icon className="fa fa-spinner fa-spin fa-5x color-black" /></div>}
      <div className="container-fluid">
        <div className="p-4">
          <CardSection sectionTitle="My Courses" hasExploreCard="true" cards={courses} total={totalCourses} />
          <CardSection sectionTitle="My Bookmarks" cards={bookmarks} total={totalBookmarks} />
          {hasCoursesTeaching
            && <CardSection sectionTitle="My Teaching" cards={coursesTeaching} total={totalCoursesTeaching} />}
        </div>
      </div>
    </main>
  );
}

DashboardPage.defaultProps = {
  coursesTeaching: null,
  totalCoursesTeaching: null,
  showCoursesSpinner: false,
  showBookmarksSpinner: false
};

DashboardPage.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.Object).isRequired,
  bookmarks: PropTypes.arrayOf(PropTypes.Object).isRequired,
  totalCourses: PropTypes.number.isRequired,
  totalBookmarks: PropTypes.number.isRequired,
  showCoursesSpinner: PropTypes.bool,
  showBookmarksSpinner: PropTypes.bool
};

export const mapStateToProps = (state) => ({
  courses: state.courses,
  bookmarks: state.bookmarks,
  totalCourses: state.totalCourses,
  totalBookmarks: state.totalBookmarks,
  showCoursesSpinner: state.showCoursesSpinner,
  showBookmarksSpinner: state.showBookmarksSpinner
});

export default connect(mapStateToProps)(DashboardPage);

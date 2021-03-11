import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Icon } from '@edx/paragon';
import CardSection from '../../components/Dashboard/CardSection';
import fetchCourses from '../../data/actions/courses'
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
class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
  }

  /*
  courses, bookmarks, totalCourses, totalBookmarks,
  showCoursesSpinner, showBookmarksSpinner,
  */

  componentDidMount() {
    this.props.fetchCourses();
  }

  render() {
  return (
    <main>
      <div className="container-fluid">
        <div className="p-4">
          <CardSection sectionTitle="My Courses" hasExploreCard="true" courses={this.props.courses} total={this.props.totalCourses} showSpinner={this.props.showCoursesSpinner} />
          <CardSection sectionTitle="My Bookmarks" courses={this.props.bookmarks} total={this.props.totalBookmarks} showSpinner={this.props.showBookmarksSpinner} />
        </div>
      </div>
    </main>
  );
}
}

DashboardPage.defaultProps = {
  showCoursesSpinner: false,
  showBookmarksSpinner: false,
};

DashboardPage.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.object).isRequired,
  bookmarks: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalCourses: PropTypes.number.isRequired,
  totalBookmarks: PropTypes.number.isRequired,
  showCoursesSpinner: PropTypes.bool,
  showBookmarksSpinner: PropTypes.bool,
};

export const mapStateToProps = state => ({
  courses: state.courses,
  bookmarks: state.bookmarks,
  totalCourses: state.totalCourses,
  totalBookmarks: state.totalBookmarks,
  showCoursesSpinner: state.showCoursesSpinner,
  showBookmarksSpinner: state.showBookmarksSpinner,
});

export default connect(mapStateToProps, { fetchCourses })(DashboardPage);

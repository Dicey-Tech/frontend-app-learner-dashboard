import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Icon } from '@edx/paragon';
import { faSearch, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import CardSection from '../../components/Dashboard/CardSection';
import fetchCourses from '../../data/actions/courses';
import ExploreCard from '../../components/Cards/ExploreCard';

class DashboardPage extends React.Component {
  /* eslint-disable */ 
  constructor(props) {
    super(props);
  }
  /* eslint-enable */

  componentDidMount() {
    this.props.fetchCourses();
  }

  render() {
    const coursesExploreCard = <ExploreCard text="Find New Courses" icon={faSearch} />;
    const bookmarkExploreCard = <ExploreCard text="You have no bookmarks." icon={faInfoCircle} />;
    return (
      <main>
        <div className="container">
          <div className="row">
            <CardSection sectionTitle="My Courses" exploreCard={coursesExploreCard} showExploreCardAlways courses={this.props.courses} total={this.props.totalCourses} showSpinner={this.props.showCoursesSpinner} />
          </div>
          <div>
            <CardSection sectionTitle="My Bookmarks" exploreCard={bookmarkExploreCard} courses={this.props.bookmarks} total={this.props.totalBookmarks} showSpinner={this.props.showBookmarksSpinner} />
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
  fetchCourses: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  courses: state.courses,
  bookmarks: state.bookmarks,
  totalCourses: state.totalCourses,
  totalBookmarks: state.totalBookmarks,
  showCoursesSpinner: state.showCoursesSpinner,
  showBookmarksSpinner: state.showBookmarksSpinner,
});

export default connect(mapStateToProps, { fetchCourses })(DashboardPage);

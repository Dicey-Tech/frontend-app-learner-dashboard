import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
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
    return (
      <main>
        <div className="container">
          <div className="row">
            <CardSection sectionTitle="My Courses" exploreCard={coursesExploreCard} showExploreCardAlways courses={this.props.courses} total={this.props.totalCourses} showSpinner={this.props.showCoursesSpinner} />
          </div>
        </div>
      </main>
    );
  }
}

DashboardPage.defaultProps = {
  showCoursesSpinner: false,
};

DashboardPage.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalCourses: PropTypes.number.isRequired,
  showCoursesSpinner: PropTypes.bool,
  fetchCourses: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  courses: state.courses,
  totalCourses: state.totalCourses,
  showCoursesSpinner: state.showCoursesSpinner,
});

export default connect(mapStateToProps, { fetchCourses })(DashboardPage);

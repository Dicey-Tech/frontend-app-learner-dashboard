import React from 'react';
import PropTypes from 'prop-types';
import ExploreCard from './ExploreCard';
import CourseCard from './CourseCard';
import SectionTitle from './SectionTitle';
import { configuration } from '../../config';

function CardSection({
  sectionTitle, hasExploreCard, courses, showSpinner,
}) {
  const cards = [];
  if (hasExploreCard) {
    cards.push(<ExploreCard text="Search Courses" key="EXPLORE_CARD" />);
  }
  courses.forEach(element => {
    const courseUrl = configuration.LMS_BASE_URL + element.courseTabs.find(({ type }) => type === 'courseware').url;
    const courseStart = element.start; // TODO need to parse this into datetime and format it.
    cards.push(
      <div className="col" key={element.courseId}>
        <CourseCard
          url={courseUrl}
          media={element.media}
          name={element.name}
          start={courseStart}
          description={element.description}
        />
      </div>,
    );
  });
  return (
    <>
      <SectionTitle>
        <div>{sectionTitle}</div>
      </SectionTitle>
      <div className="container">
        <div className="row align-items-start">
          {showSpinner && <div>Imagine a Spinner here</div>}
          {!showSpinner && cards}
        </div>
      </div>
    </>
  );
}

CardSection.defaultProps = {
  hasExploreCard: false,
  courses: [],
  showSpinner: false,
};
CardSection.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  hasExploreCard: PropTypes.bool,
  courses: PropTypes.arrayOf(PropTypes.object),
  showSpinner: PropTypes.bool,
};

export default CardSection;

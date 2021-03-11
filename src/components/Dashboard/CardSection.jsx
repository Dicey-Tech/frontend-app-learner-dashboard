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
    cards.push(<ExploreCard text="Search Courses" icon="fa-search" iconClassName="fa fa-search" key="EXPLORE_CARD"/>);
  }
  courses.forEach(element => {
    const courseUrl = configuration.LMS_BASE_URL + element.courseTabs.find(({ type }) => type === 'courseware').url
    const courseImageUrl = element.media;
    const courseStart = element.start; //TODO need to parse this into datetime and format it.
    cards.push(<CourseCard url={courseUrl} imageUrl={courseImageUrl} name={element.name} 
      start={courseStart} description={element.description}  key={element.courseId}/>);
  });
  return (
    <>
      <SectionTitle>
        <div>{sectionTitle}</div>
      </SectionTitle>
      <div>
        {showSpinner && <div>Imagine a Spinner here</div>}
        {!showSpinner && cards}
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

import React from 'react';
import PropTypes from 'prop-types';
import ExploreCard from './ExploreCard';
import CourseCard from './CourseCard';
import SectionTitle from './SectionTitle';

function CardSection({ sectionTitle, hasExploreCard, courses }) {
  const cards = [];
  if (hasExploreCard) {
    cards.push(<ExploreCard />);
  }
  courses.foreach(element => {
    cards.push(<CourseCard data={element} />);
  });
  return (
    <>
      <SectionTitle>
        <div>{sectionTitle}</div>
      </SectionTitle>
      <div>
        {cards}
      </div>
    </>
  );
}

CardSection.defaultProps = {
  hasExploreCard: false,
  courses: [],
};
CardSection.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  hasExploreCard: PropTypes.bool,
  courses: PropTypes.arrayOf(PropTypes.object),
};

export default CardSection;

import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from '@edx/paragon';
import CourseCard from '../Cards/CourseCard';
import SectionTitle from './SectionTitle';
import { configuration } from '../../config';

export default function CardSection({
  sectionTitle, exploreCard, showExploreCardAlways, courses, showSpinner,
}) {
  const cards = [];
  if (exploreCard) {
    if (showExploreCardAlways || !courses || courses.length === 0) {
      cards.push(React.cloneElement(exploreCard, { key: 'EXPLORE_CARD' }));
    }
  }
  courses.forEach(element => {
    // TODO for bookmarks we have to go to /courses/<course>/jump_to/<usage_id>
    const courseUrl = configuration.LMS_BASE_URL + element.courseTabs.find(({ type }) => type === 'courseware').url;
    const courseStart = Date.parse(element.start);
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
        <div className={showSpinner ? 'd-flex  flex-row justify-content-centre' : 'd-flex flex-row justify-content-start'}>
          {showSpinner && <div className="dicey-react-loading-skeleton"><Spinner className="spinner" animation="border" /></div>}
          {!showSpinner && cards}
        </div>
      </div>
    </>
  );
}

CardSection.defaultProps = {
  exploreCard: null,
  showExploreCardAlways: false,
  courses: [],
  showSpinner: false,
};
CardSection.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  exploreCard: PropTypes.element,
  showExploreCardAlways: PropTypes.bool,
  courses: PropTypes.arrayOf(PropTypes.object),
  showSpinner: PropTypes.bool,
};

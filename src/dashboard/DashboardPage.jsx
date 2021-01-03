import React from 'react';
import {
  CardDeck,
} from '@edx/paragon';
import {
  faPlusCircle,
  faSearchPlus,
} from '@fortawesome/free-solid-svg-icons';
import CourseCard from './CourseCard';
import SectionTitle from './SectionTitle';
import ExploreCard from './ExploreCard';

// replaced by service call
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

export default function DashboardPage() {
  const renderCardSection = (sectionTitle, exploreText, exploreIcon, data) => {
    const cardList = [];
    // TODO don't add explore card for class section if student
    // add explore card to front of deck
    cardList.push(
      <ExploreCard text={exploreText} icon={exploreIcon} iconClassName="card-icon" key="explore" />,
    );

    // add remaining course cards
    data.forEach((card) => {
      cardList.push(
        <CourseCard title={card.name} ageGroup={card.ageGroup} length={card.length} description={card.description} key={`course-${card.name}`} />,
      );
    });

    return (
      <div>
        <SectionTitle>{sectionTitle}</SectionTitle>
        <div className="row p-3 mb-2">
          <CardDeck className="row">
            {cardList}
          </CardDeck>
        </div>
      </div>
    );
  };

  return (
    <main>
      <div className="container-fluid">
        <div className="p-4">
          {renderCardSection('My Classes', 'New Class', faPlusCircle, cardData)}
          {renderCardSection('My Courses', 'Find new courses', faSearchPlus, cardData)}
          {renderCardSection('My Bookmarks', 'Find new courses', faSearchPlus, cardData)}
        </div>
      </div>
    </main>
  );
}

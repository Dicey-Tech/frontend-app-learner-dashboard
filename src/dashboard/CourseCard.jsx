import React from 'react';
import {
  Card,
  Button,
} from '@edx/paragon';
import PropTypes from 'prop-types';
import jewellery from './JewelleryOrganiser.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBookmark} from '@fortawesome/free-regular-svg-icons';

export default function CourseCard(props) {

  return (
    <Card className="courseCard">
      <Card.Img variant="top" src={jewellery} className="card-image" />
      <Card.Body className="pt-2 pl-4 pr-4 pb-2 position-relative">
        <div className="row">
          <Card.Title>{props.title}</Card.Title>
        </div>
        <div className="row">
          <div className="col col-6 p-0">
            <Card.Subtitle>{props.ageGroup}</Card.Subtitle>
          </div>
          <div className="col col-6 p-0 text-right">
            <Card.Subtitle className>{props.length}</Card.Subtitle>
          </div>
        </div>
        <div className="row">
          <Card.Text className="card-description">{props.description}</Card.Text>
        </div>
        <div className="row" id="action-row">
          <div className="col col-6 p-0">
            <Button variant="primary">Start Now</Button>
          </div>
          <div className="col col-6 p-0 text-right">
            <FontAwesomeIcon icon={faBookmark} className="bookmark-icon" />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

CourseCard.propTypes - {
  title: PropTypes.string,
  ageGroup: PropTypes.string,
  length: PropTypes.string,
  description: PropTypes.string,
}

import React from 'react';
import {
  Card,
  Button,
} from '@edx/paragon';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
// import jewellery from '../../dashboard/JewelleryOrganiser.png';

export default function CourseCard(props) {
  return (
    <Card className="courseCard">
      <Card.Img variant="top" src={props.media} className="card-image" />
      <Card.Body className="pt-2 pl-4 pr-4 pb-2 position-relative">
        <div className="row">
          <Card.Title>{props.name}</Card.Title>
        </div>
        <div className="row">
          <div className="col col-6 p-0">
            <Card.Subtitle>{props.description}</Card.Subtitle>
          </div>
          <div className="col col-6 p-0 text-right">
            <Card.Subtitle className>{props.start}</Card.Subtitle>
          </div>
        </div>
        <div className="row" id="action-row">
          <div className="col col-6 p-0">
            <Button variant="primary" href={props.url}>Start Now</Button>
          </div>
          <div className="col col-6 p-0 text-right">
            <FontAwesomeIcon icon={faBookmark} className="bookmark-icon" />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

CourseCard.defaultProps = {
  description: 'no description available',
};

CourseCard.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  media: PropTypes.string.isRequired,
  description: PropTypes.string,
  start: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

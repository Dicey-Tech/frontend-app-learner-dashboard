import React from 'react';
import {
  Card,
} from '@edx/paragon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

export default function ExploreCard(props) {
  return (
    <Card className="exploreCard">
      <Card.Body className="exploreCardBody">
        <FontAwesomeIcon name="search" className={props.iconClassName} />
        <Card.Text>{props.text}</Card.Text>
      </Card.Body>
    </Card>
  );
}

ExploreCard.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  iconClassName: PropTypes.string.isRequired,
};

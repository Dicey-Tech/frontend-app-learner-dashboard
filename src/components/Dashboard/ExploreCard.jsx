import React from 'react';
import {
  Card,
} from '@edx/paragon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import PropTypes from 'prop-types';
import './index.scss';

export default function ExploreCard(props) {
  return (
    <Card className="exploreCard">
      <Card.Body className="exploreCardBody">
        <div className="exploreSearchIcon">
          <FontAwesomeIcon icon={faSearch} inverse size="2x" />
        </div>
        <Card.Text>{props.text}</Card.Text>
      </Card.Body>
    </Card>
  );
}

ExploreCard.propTypes = {
  text: PropTypes.string.isRequired,
};

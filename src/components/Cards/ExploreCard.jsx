import React from 'react';
import {
  Card,
} from '@edx/paragon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';
import { configuration } from '../../config';
import './index.scss';

export default function ExploreCard(props) {
  return (
    <Card className="exploreCard">
      <Card.Body className="exploreCardBody">
        <Card.Link href={configuration.EXPLORE_COURSES_URL}>
          <div className="exploreSearchIcon">
            <FontAwesomeIcon icon={props.icon} inverse size="2x" />
          </div>
        </Card.Link>
        <Card.Text>{props.text}</Card.Text>
      </Card.Body>
    </Card>
  );
}

ExploreCard.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};

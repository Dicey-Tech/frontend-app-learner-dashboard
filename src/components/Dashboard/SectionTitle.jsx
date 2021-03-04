import React from 'react';
import PropType from 'prop-types';

export default function SectionTitle(props) {
  return (
    <span className="sectionTitle">{props.children}</span>
  );
}

SectionTitle.propTypes = {
  children: PropType.string.isRequired,
};

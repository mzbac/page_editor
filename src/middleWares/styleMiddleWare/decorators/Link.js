import React, { PropTypes } from 'react';
import { Entity } from 'draft-js';

const Link = (props) => {
  const { url } = Entity.get(props.entityKey).getData();
  return (
    <a
      href={url}
      style={{
        color: '#3b5998',
        textDecoration: 'none',
      }}
      target="_blank"
    >
      {props.children}
    </a>
  );
};
Link.propTypes = {
  entityKey: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Link;
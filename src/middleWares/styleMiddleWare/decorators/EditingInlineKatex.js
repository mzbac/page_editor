import React, { PropTypes } from 'react';
import { Entity } from 'draft-js';
import styles from './EditingInlineKatex.import.css';

const InlineKatex = (props) => {
  return (
    <span className={styles.container} >
      {props.children}
    </span>
  );
};
InlineKatex.propTypes = {
  entityKey: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default InlineKatex;






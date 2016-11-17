import React, { PropTypes } from 'react';
import styles from './KatexOutput.css';
import { KatexComponent } from '../../components';

const KatexOutput = (props) => {
  const { editMode, content } = props;
  let className = styles.container;
  if (editMode) {
    className += styles.containerActiveTeX;
  }
  return (
    <div className={className} >
      <KatexComponent content={content} />
    </div>
  );
};
KatexOutput.propTypes = {
  content: PropTypes.string,
  editMode: PropTypes.bool.isRequired,
};
export default KatexOutput;
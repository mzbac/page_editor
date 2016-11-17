import React, { PropTypes } from 'react';
// local reference
import styles from './GenericContainerOutput.css';

export const GenericContainerOutput = (props) => {
  const { genericPanelComponent } = props;

  return (
    <div className={styles.container} >
      {genericPanelComponent}
    </div>
  );
};

GenericContainerOutput.propTypes = {
  outputComponent: PropTypes.element,
};
export default GenericContainerOutput;
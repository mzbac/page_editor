import React, { PropTypes } from 'react';

export const LeftPanel = (props) => {
  const { panelComponent } = props;

  return (
    <div >
      {panelComponent}
    </div>
  );
};

LeftPanel.propTypes = {
  panelComponent: PropTypes.node,
};

export default LeftPanel;
import React, { PropTypes } from 'react';

export const RightPanel = (props) => {
  const { panelComponent } = props;

  return (
    <div >
      {panelComponent}
    </div>
  );
};

RightPanel.propTypes = {
  panelComponent: PropTypes.node,
};

export default RightPanel;
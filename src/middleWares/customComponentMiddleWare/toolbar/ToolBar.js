import React, { Component, PropTypes } from 'react';
import defaultControls from '../config';
import creatCustomComponentButton from './creatCustomComponentButton';
class ToolBar extends Component {
  constructor() {
    super();
  }

  render() {
    const { controls = defaultControls, store, theme } = this.props;
    return (
      <div>
        <div className={theme.toolbar} >
          {controls.map((control, index) => {
              const Component = creatCustomComponentButton({ store, control, index, theme });
              return <Component
                key={index}
              />
            }
          )}
        </div>
      </div>
    );
  }
}
ToolBar.propTypes = {};
export default ToolBar;
import React, { Component, PropTypes } from 'react';
import defaultControls from '../config';
import InputBox from './InputBox';
import createInlineStyleButton from './createInlineStyleButton';
class ToolBar extends Component {
  constructor() {
    super();
    this.state = {
      onInput: undefined,
      onInputReject: undefined,
    };
  }

  render() {
    const { onInput, onInputReject } =this.state;
    const { controls = defaultControls, store, theme } = this.props;
    return (
      <div>
        <div className={theme.toolbar} >
          {controls.map((control, index) => {
              const Component = createInlineStyleButton({ store, control, index, theme });
              return <Component
                key={index}
                onInput={(resolve, reject) => {
                  this.setState({
                    onInput: resolve,
                    onInputReject: reject,
                  });
                }}
                onCompleted={() => {
                  this.setState({
                    onInput: undefined,
                    onInputReject: undefined,
                  });
                }}
              />
            }
          )}
        </div>
        <div className={theme.inputBoxContainer} >
          <InputBox onInput={onInput} onInputReject={onInputReject} />
        </div>
      </div>
    );
  }
}
ToolBar.propTypes = {};
export default ToolBar;






import React, { Component, PropTypes } from 'react';
import * as constants from '../constants';
import _ from 'lodash';
import components from './componentsMapper';
import style from './EditPanel.css';
const getDefaultSelectComponentName = (props) => {
  const { configTarget, leftPanelData, rightPanelData, genericPanelData } = props;
  if (configTarget === constants.SPLIT_CONTAINER_LEFT) {
    if (leftPanelData) {
      return leftPanelData.componentName
    }
  }
  if (configTarget === constants.SPLIT_CONTAINER_Right) {
    if (rightPanelData) {
      return rightPanelData.componentName
    }
  }
  if (configTarget === constants.GENERICCONTAINER_PANEL) {
    if (genericPanelData) {
      return genericPanelData.componentName
    }
  }
  return [...components.keys()][0];
};
class EditPanel extends Component {
  constructor(props) {
    super(props);
    const { onDone, configTarget, leftPanelData, rightPanelData, genericPanelData } = this.props;
    this.state = {
      selectComponentName: getDefaultSelectComponentName(this.props),
    };
    this.handleChange = (event) => {
      this.setState({ selectComponentName: event.target.value });
    };
    this.propsOnChange = (evt, propName) => {
      this.setState({ [propName]: evt.target.value });
    };
    this.onDone = () => {
      if (
        configTarget === constants.SPLIT_CONTAINER_LEFT
        || configTarget === constants.SPLIT_CONTAINER_Right
        || configTarget === constants.GENERICCONTAINER_PANEL) {
        const config = components.get(this.state.selectComponentName) ?
          Object.keys(components.get(this.state.selectComponentName).props)
            .reduce((last, current) =>
                Object.assign(
                  {},
                  last,
                  { [current]: (this.getCurrentProp(this.state, current) && this.getCurrentProp(this.state, current).trim()) || '' }),
              { componentName: this.state.selectComponentName })
          : null;
        onDone(config);
      }
    };

    this.getDefaultSubComponentValue = (propName) => {
      if (configTarget === constants.SPLIT_CONTAINER_LEFT) {
        if (leftPanelData && leftPanelData.componentName === this.state.selectComponentName) {
          return leftPanelData[propName]
        }
      }
      if (configTarget === constants.SPLIT_CONTAINER_Right) {
        if (rightPanelData && rightPanelData.componentName === this.state.selectComponentName) {
          return rightPanelData[propName]
        }
      }
      if (configTarget === constants.GENERICCONTAINER_PANEL) {
        if (genericPanelData && genericPanelData.componentName === this.state.selectComponentName) {
          return genericPanelData[propName]
        }
      }
      return undefined;
    };

    this.getCurrentProp = (state, current) => {
      if (state[current]) {
        return state[current];
      }
      if (configTarget === constants.SPLIT_CONTAINER_LEFT) {
        if (leftPanelData && leftPanelData.componentName === this.state.selectComponentName) {
          return leftPanelData[current]
        }
      }
      if (configTarget === constants.SPLIT_CONTAINER_Right) {
        if (rightPanelData && rightPanelData.componentName === this.state.selectComponentName) {
          return rightPanelData[current]
        }
      }
      if (configTarget === constants.GENERICCONTAINER_PANEL) {
        if (genericPanelData && genericPanelData.componentName === this.state.selectComponentName) {
          return genericPanelData[current]
        }
      }
      return undefined;
    };
  }

  render() {
    const {
      onCancel,
      configTarget,
      leftPanelConfig, // eslint-disable-line no-unused-vars
      rightPanelConfig, // eslint-disable-line no-unused-vars
      genericPanelData, // eslint-disable-line no-unused-vars
    } = this.props;
    let panel = null;
    if (
      configTarget === constants.SPLIT_CONTAINER_LEFT
      || configTarget === constants.SPLIT_CONTAINER_Right
      || configTarget === constants.GENERICCONTAINER_PANEL) {
      panel = (<div style={{ marginBottom: 20 }} >
        <select className="form-control" onChange={this.handleChange} >
          {[...components.keys()].map(item => <option key={item} value={item} >{item}</option>)}
        </select>
        {
          components.get(this.state.selectComponentName) ?
            Object.keys(components.get(this.state.selectComponentName).props).map(item =>
              <form key={item} >
                <div className="form-group" >
                  <label style={{ padding: '0.5em' }} >{item}</label>
                  <input
                    value={this.state[item] === undefined ? this.getDefaultSubComponentValue(item) || '' : this.state[item]}
                    type="text"
                    className="form-control"
                    placeholder={item}
                    onChange={(evt) => {
                      this.propsOnChange(evt, item);
                    }}
                  />
                </div>
              </form>
            ) : null
        }
      </div>);
    }
    return (
      <div className={style.editPanel} >
        Edit Panel : {configTarget}
        {panel}
        <div className={style.editBtns} >
          <button
            className={style.saveButton}
            onClick={this.onDone} style={{ margin: 6 }}
          >
            Done
          </button>
          <button
            className={style.removeButton}
            onClick={onCancel} style={{ margin: 6 }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}
EditPanel.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  configTarget: PropTypes.string,
  leftPanelConfig: PropTypes.object,
  rightPanelConfig: PropTypes.object,
};
export default EditPanel;
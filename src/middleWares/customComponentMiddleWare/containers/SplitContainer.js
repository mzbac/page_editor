import React, { Component, PropTypes } from 'react';
import { Entity } from 'draft-js';
import EditPanel from './EditPanel';
import LeftPanel from './splitContainer/LeftPanel';
import RightPanel from './splitContainer/RightPanel';
import subComponentBuilder from './componentBuilder';
import * as contants from '../constants';
import styles from './SplitContainer.css';

class SplitContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      editTarget: undefined,
      leftPanel: undefined,
      rightPanel: undefined,
    };

    this.startEdit = () => {
      this.props.blockProps.onStartEdit(this.props.block.getKey());
    };
    this.finishEdit = () => {
      this.props.blockProps.onFinishEdit(this.props.block.getKey());
    };
    this.onClickLeft = () => this._config.bind(this, contants.SPLIT_CONTAINER_LEFT)();
    this.onClickRight = () => this._config.bind(this, contants.SPLIT_CONTAINER_Right)();
    this.onCancel = () => {
      this.setState({
        editMode: false,
        configTarget: undefined,
      }, () => {
        this.finishEdit();
      });
    };
    this.editPanelDone = config => this._editPanelDone(config);
  }

  _config(target) {
    const { blockProps } =this.props;
    const { isReadOnly } =blockProps;
    if (this.state.editMode || isReadOnly) {
      return;
    }

    this.setState({
      editMode: true,
      configTarget: target,
    }, () => {
      this.startEdit();
    });
  }

  _editPanelDone(data) {
    if (this.state.configTarget === contants.SPLIT_CONTAINER_LEFT) {
      Entity.get(this.props.block.getEntityAt(0))
        .getData()
        .data[this.state.configTarget] = data;
      const component = subComponentBuilder(data);
      this.setState({
        editMode: false,
        configTarget: undefined,
        leftPanel: component,
        leftPanelConfig: data,
      }, () => {
        this.finishEdit();
      });
    }

    if (this.state.configTarget === contants.SPLIT_CONTAINER_Right) {
      Entity.get(this.props.block.getEntityAt(0))
        .getData()
        .data[this.state.configTarget] = data;
      const component = subComponentBuilder(data);
      this.setState({
        editMode: false,
        configTarget: undefined,
        rightPanel: component,
        rightPanelConfig: data,
      }, () => {
        this.finishEdit();
      });
    }
  }

  render() {
    const {
      editMode,
      configTarget,
      leftPanelConfig,
      rightPanelConfig,
    } = this.state;
    let {
      leftPanel,
      rightPanel,
    } =this.state;
    const { blockProps } =this.props;
    const { isReadOnly } =blockProps;

    leftPanel = Entity.get(this.props.block.getEntityAt(0))
      .getData()
      .data[contants.SPLIT_CONTAINER_LEFT] ?
      subComponentBuilder(Entity.get(this.props.block.getEntityAt(0))
        .getData()
        .data[contants.SPLIT_CONTAINER_LEFT]) :
      leftPanel;

    rightPanel = Entity.get(this.props.block.getEntityAt(0))
      .getData()
      .data[contants.SPLIT_CONTAINER_Right] ?
      subComponentBuilder(Entity.get(this.props.block.getEntityAt(0))
        .getData()
        .data[contants.SPLIT_CONTAINER_Right]) :
      rightPanel;
    return (
      <div>
        <div className={styles.container} style={!isReadOnly ? { minHeight: '200px' } : { border: 'none' }} >
          <div className={styles.leftContainer} onClick={this.onClickLeft}
               style={!isReadOnly ? {} : { border: 'none' }} >
            <LeftPanel
              panelComponent={leftPanel}
            />
          </div>
          <div className={styles.rightContainer} onClick={this.onClickRight}
               style={!isReadOnly ? {} : { border: 'none' }} >
            <RightPanel
              panelComponent={rightPanel}
            />
          </div>
        </div>
        {editMode ? <EditPanel
          onDone={this.editPanelDone}
          onCancel={this.onCancel}
          leftPanelData={leftPanelConfig}
          rightPanelData={rightPanelConfig}
          configTarget={configTarget}
        /> : null}
      </div>
    );
  }
}
SplitContainer.propTypes = {};
export default SplitContainer;

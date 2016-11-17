import React, { Component, PropTypes } from 'react';
import { Entity } from 'draft-js';
import EditPanel from './EditPanel';
import GenericContainerOutput from './genericContainer/GenericContainerOutput';
import * as contants from '../constants';
import subComponentBuilder from './componentBuilder';
import styles from './GenericContainer.css';

class GenericContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      configTarget: undefined,
      genericPanelData: undefined,
    };
    this.startEdit = () => {
      this.props.blockProps.onStartEdit(this.props.block.getKey());
    };
    this.finishEdit = () => {
      this.props.blockProps.onFinishEdit(this.props.block.getKey());
    };
    this.onConfig = () => this._config.bind(this, contants.GENERICCONTAINER_PANEL)();
    this.editPanelDone = config => this._editPanelDone(config);
    this.onCancel = () => {
      this.setState({
        editMode: false,
      }, () => {
        this.finishEdit();
      });
    };
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
    Entity.get(this.props.block.getEntityAt(0))
      .getData()
      .data = data;
    const component = subComponentBuilder(data);
    this.setState({
      editMode: false,
      genericPanelComponent: component,
      genericPanelData: data,
    }, () => {
      this.finishEdit();
    });
  }

  render() {
    const { editMode, configTarget, genericPanelData } = this.state;
    let { genericPanelComponent } = this.state;
    const { blockProps } =this.props;
    const { isReadOnly } =blockProps;
    genericPanelComponent = Entity.get(this.props.block.getEntityAt(0))
      .getData()
      .data ?
      subComponentBuilder(Entity.get(this.props.block.getEntityAt(0))
        .getData()
        .data) :
      genericPanelComponent;
    return (
      <div>
        <div className={styles.container} onClick={this.onConfig}
             style={!isReadOnly ? { minHeight: '200px' } : { border: 'none' }} >
          <GenericContainerOutput genericPanelComponent={genericPanelComponent} />
        </div>
        {editMode ? <EditPanel
          onDone={this.editPanelDone}
          onCancel={this.onCancel}
          configTarget={configTarget}
          genericPanelData={genericPanelData}
        /> : null}
      </div>
    );
  }
}
GenericContainer.propTypes = {};
export default GenericContainer;

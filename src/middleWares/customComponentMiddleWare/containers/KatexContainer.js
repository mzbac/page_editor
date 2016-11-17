import React, { Component, PropTypes } from 'react';
import { Entity } from 'draft-js';
import katex from 'katex';

import {
  KatexOutput,
  EditPanel,
} from './katexContainer';

import styles from './KatexContainer.css';

class KatexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      invalidTeX: false,
      texValue: this._getValue(),
    };
    this.onConfig = () => this._onConfig();
    this.onValueChange = evt => this._onValueChange(evt);
    this.onSave = () => this._save();
    this.onCancel = () => {
      this.setState({
        editMode: false,
      }, () => {
        this.finishEdit();
      });
    };
    this.startEdit = () => {
      this.props.blockProps.onStartEdit(this.props.block.getKey());
    };
    this.finishEdit = () => {
      this.props.blockProps.onFinishEdit(this.props.block.getKey());
    };
    this.remove = () => {
      this.props.blockProps.onRemove(this.props.block.getKey());
    };
  }

  _onConfig() {
    const { blockProps } =this.props;
    const { isReadOnly } =blockProps;
    if (this.state.editMode || isReadOnly) {
      return;
    }

    this.setState({
      editMode: true,
    }, () => {
      this.startEdit();
    });
  }

  _onValueChange(evt) {
    const value = evt.target.value;
    let invalid = false;
    let errorMsg = '';
    try {
      katex.__parse(value);
    } catch (e) {
      invalid = true;
      errorMsg = e.message;
    } finally {
      this.setState({
        invalidTeX: invalid,
        texValue: value,
        errorMsg,
      });
    }
  }

  _save() {
    const entityKey = this.props.block.getEntityAt(0);
    Entity.mergeData(entityKey, {
      data: {
        componentName: 'KatexComponent',
        content: this.state.texValue,
      },
    });
    this.setState({
      invalidTeX: false,
      editMode: false,
    }, this.finishEdit);
  }

  _getValue() {
    return Entity
      .get(this.props.block.getEntityAt(0))
      .getData().data.content;
  }

  render() {
    const {
      editMode,
      texValue,
      errorMsg,
      invalidTeX,
    } = this.state;
    const { blockProps } =this.props;
    const { isReadOnly } =blockProps;
    let texContent = '';
    if (editMode) {
      if (invalidTeX) {
        texContent = '';
      } else {
        texContent = texValue;
      }
    } else {
      texContent = this._getValue();
    }
    return (
      <div>
        <div
          className={styles.katexContainer}
          onClick={this.onConfig}
          style={!isReadOnly ? { minHeight: '200px' } : { border: 'none' }}
        >
          <KatexOutput content={texContent} editMode={editMode} />
        </div>
        {editMode ? <EditPanel
          onChange={this.onValueChange}
          texValue={texValue}
          errorMsg={errorMsg}
          invalidTeX={invalidTeX}
          onSave={this.onSave}
          onCancel={this.onCancel}
        /> : null}
      </div>
    );
  }
}
KatexContainer.propTypes = {
  blockProps: PropTypes.object.isRequired,
  block: PropTypes.object.isRequired,
};
export default KatexContainer;
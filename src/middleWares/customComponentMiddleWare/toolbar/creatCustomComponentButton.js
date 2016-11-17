import React, { Component } from 'react';
import {
  RichUtils,
  Entity
} from 'draft-js';
import * as customType from '../constants';
import * as defaultModifiers from '../modifiers';
export default ({ store, control, index, theme, modifiers = defaultModifiers }) => (
  class CustomComponentButton extends Component {

    insertCustomComponent = (event) => {
      event.preventDefault();
      if (control.customType === customType.GENERICCONTAINER) {
        store.setEditorState(modifiers.insertGenericContainer(store.getEditorState()));
      }
      if (control.customType === customType.SPLITCONTAINER) {
        store.setEditorState(modifiers.insertSplitContainer(store.getEditorState()));
      }
      if (control.customType === customType.KATEXCONTAINER) {
        store.setEditorState(modifiers.insertKatexContainer(store.getEditorState()));
      }
    };

    preventBubblingUp = (event) => {
      event.preventDefault();
    };


    render() {
      return (
        <div
          className={theme.buttonWrapper}
          key={index}
          onMouseDown={this.preventBubblingUp}
        >
          <button
            onClick={this.insertCustomComponent}
            type="button"
            children={control.element}
          />
        </div>
      );
    }
  }
);

import React, { Component } from 'react';
import {
  RichUtils,
  Entity
} from 'draft-js';
import unionClassNames from 'union-class-names';
import { INLINE, BLOCK } from '../constants';
import toggleInlineStyle from '../utils/toggleInlineStyle';
import toggleBlockStyle from '../utils/toggleBlockStyle';
export default ({ store, control, index, theme }) => (
  class InlineStyleButton extends Component {

    toggleStyle = (event) => {
      event.preventDefault();
      if (control.needInput && control.styleType === INLINE) {
        const inputPromise = new Promise((resolve, reject) => {
          this.props.onInput(resolve, reject);
        });
        inputPromise.then((val) => {
          const editorState = store.getEditorState();
          const entityKey = Entity.create(control.type, control.mutable, { [control.entityDataKey]: val });
          const preEditorState = RichUtils.toggleInlineStyle(
            editorState,
            control.type
          );
          store.setEditorState(RichUtils.toggleLink(
            preEditorState,
            preEditorState.getSelection(),
            entityKey
          ));

          this.props.onCompleted();
        }, () => {
          this.props.onCompleted();
        });
      }
      if (control.styleType === INLINE) toggleInlineStyle(control.inlineStyle, store);
      if (control.styleType === BLOCK) toggleBlockStyle(control.blockStyle, store);
    };

    preventBubblingUp = (event) => {
      event.preventDefault();
    };


    render() {
      // const currentStyle = store.getEditorState().getCurrentInlineStyle();
      // const className = currentStyle.has(control.inlineStyle) ? unionClassNames(theme.button, theme.active) : theme.button;
      return (
        <div
          className={theme.buttonWrapper}
          key={index}
          onMouseDown={this.preventBubblingUp}
        >
          <button
            onClick={this.toggleStyle}
            type="button"
            children={control.element}
          />
        </div>
      );
    }
  }
);

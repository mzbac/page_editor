import React, { Component } from 'react';
import toggleInlineStyle from './toggleInlineStyle';
import {
  RichUtils,
} from 'draft-js';

const getDisplayName = (WrappedComponent) => {
  const component = WrappedComponent.WrappedComponent || WrappedComponent;
  return component.displayName || component.name || 'Component';
};

export default (store, config) => (WrappedComponent) => {
  class ApplyToggleInlineStyleComponent extends Component { // eslint-disable-line react/prefer-stateless-function
    render() {
      const {} = config;
      const { inlineStyle } = this.props;
      return (
        <div onClick={(event) => {
          event.preventDefault();
          toggleInlineStyle(inlineStyle, store);
        }} >
          <WrappedComponent
            {...this.props}
          />
        </div>
      );
    }
  }
  ApplyToggleInlineStyleComponent.displayName = `propDecorator(${getDisplayName(WrappedComponent)})`;
  ApplyToggleInlineStyleComponent.WrappedComponent = WrappedComponent.WrappedComponent || WrappedComponent;
  return ApplyToggleInlineStyleComponent;
};
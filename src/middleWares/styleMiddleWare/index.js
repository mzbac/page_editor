import React from 'react';
import applyToggleInlineStyleToComponent from './utils/applyToggleInlineStyleToComponent';
import toggleInlineStyle from './utils/toggleInlineStyle';
import toggleBlockStyle from './utils/toggleBlockStyle';
import defaultTheme from './css/inlineStyle.css'
import { ToolBar } from './toolbar';
import decorators, { inlineKatexOnEditorDecorator } from './decorators'
const createInlineStyleMiddleWare = (config = {}) => {
  const store = {
    getEditorState: undefined,
    setEditorState: undefined,
  };

  const { theme = defaultTheme } = config;

  return {
    applyToggleInlineStyleToComponent: applyToggleInlineStyleToComponent(store, config),
    DefaultToolBar: <ToolBar store={store} theme={theme} />,
    toggleInlineStyle: (style) => toggleInlineStyle(style, store),
    toggleBlockStyle: (style) => toggleBlockStyle(style, store),
    initialize: ({ getEditorState, setEditorState }) => {
      store.getEditorState = getEditorState;
      store.setEditorState = setEditorState;
    },
    decorators: inlineKatexOnEditorDecorator,
    onReadOnlyDecorators: decorators,
  };
};

export default createInlineStyleMiddleWare;

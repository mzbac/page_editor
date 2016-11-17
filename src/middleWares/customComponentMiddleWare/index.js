import React from 'react';
import { Map } from 'immutable';
import { ToolBar } from './toolbar';
import blockRenderHandler from './blockRenderHandlers'
import defaultTheme from './css/customComponent.css'

const createCustomComponentMiddleWare = (config = {}) => {
  const store = {
    getEditorState: undefined,
    setEditorState: undefined,
  };

  const { theme = defaultTheme, modifiers, controls } = config;

  return {
    blockRenderMap: Map({ atomic: { element: 'div' } }),
    DefaultToolBar: <ToolBar store={store} theme={theme} modifiers={modifiers} controls={controls} />,
    blockRendererFn: blockRenderHandler,
    initialize: ({ getEditorState, setEditorState }) => {
      store.getEditorState = getEditorState;
      store.setEditorState = setEditorState;
    },
  };
};

export default createCustomComponentMiddleWare;
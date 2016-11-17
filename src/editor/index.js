import React, { Component, PropTypes } from 'react';
import {
  Editor,
  EditorState,
  Entity,
  RichUtils,
  convertFromRaw,
  convertToRaw,
  DefaultDraftBlockRenderMap,
  CompositeDecorator,
  Modifier,
} from 'draft-js';
import { List, Map } from 'immutable';
import _ from 'lodash';
import proxies from './proxies';

class CardEditor extends Component {
  static propTypes = {
    editorState: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    middleWares: React.PropTypes.array,
    customStyleMap: React.PropTypes.object,
    decorators: React.PropTypes.array,
  };
  static defaultProps = {
    defaultBlockRenderMap: true,
    customStyleMap: {},
    middleWares: [],
    decorators: [],
  };

  constructor(props) {
    super(props);
    const { middleWares } = props;

    for (const middleWare of middleWares) {
      if (typeof middleWare.initialize !== 'function') continue;
      middleWare.initialize({
        setEditorState: (editorState) => this.onChange(editorState),
        getEditorState: () => this.props.editorState,
      });
    }

    // attach proxy methods like `focus` or `blur`
    for (const method of proxies) {
      this[method] = (...args) => (
        this.editor[method](...args)
      );
    }
    this.state = {
      liveCustomComponentEdits: Map(), // eslint-disable-line new-cap
    };
  }

  componentWillMount() {
    const { decorators, middleWares, readOnly } = this.props;
    const convertedDecorators = List([{ decorators }, ...middleWares])
      .filter((item) => readOnly ? item.onReadOnlyDecorators !== undefined : item.decorators !== undefined)
      .flatMap((item) => readOnly ? item.onReadOnlyDecorators : item.decorators)
      .map((decorator) => ({
        strategy: decorator.strategy,
        component: decorator.component,
      }))
      .toJS();
    const compositeDecorator = new CompositeDecorator(convertedDecorators);
    const editorState = EditorState.set(this.props.editorState, { decorator: compositeDecorator });
    this.onChange(editorState);
  }

  componentWillUnmount() {
    const { middleWares, editorState } = this.props;
    for (const middleWare of middleWares) {
      if (typeof middleWare.willUnmount !== 'function') continue;
      middleWare.willUnmount({
        setEditorState: (editorState) => this.onChange(editorState),
        getEditorState: () => this.props.editorState,
      });
    }
  }

  onChange(editorState) {
    let newEditorState = editorState;
    const { middleWares } = this.props;
    middleWares.forEach((middleWare) => {
      if (middleWare.onChange) {
        newEditorState = middleWare.onChange(newEditorState, {
          setEditorState: (editorState) => this.onChange(editorState),
          getEditorState: () => this.props.editorState,
        });
      }
    });

    if (this.props.onChange) {
      this.props.onChange(newEditorState, {
        setEditorState: (editorState) => this.onChange(editorState),
        getEditorState: () => this.props.editorState,
      });
    }
  };

  blockRenderer(contentBlock) {
    const { middleWares } = this.props;
    let block = {};
    for (const middleWare of middleWares) {
      if (typeof middleWare.blockRendererFn !== 'function') continue;
      const result = middleWare.blockRendererFn.bind(this)(contentBlock);
      if (result !== undefined && result !== null) {
        block = { ...block, ...result };
      }
    }
    return block;
  }

  render() {
    const { middleWares, defaultBlockRenderMap } = this.props;
    const customStyleMap = middleWares
      .filter((plug) => plug.customStyleMap !== undefined)
      .map((plug) => plug.customStyleMap)
      .concat([this.props.customStyleMap])
      .reduce((styles, style) => (
        {
          ...styles,
          ...style,
        }
      ), {});

    let blockRenderMap = middleWares
      .filter((middleWare) => middleWare.blockRenderMap !== undefined)
      .reduce((maps, middleWare) => maps.merge(middleWare.blockRenderMap), Map({}));
    if (defaultBlockRenderMap) {
      blockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);
    }
    if (this.props.blockRenderMap) {
      blockRenderMap = blockRenderMap.merge(this.props.blockRenderMap);
    }
    return (
      <Editor
        {...this.props}
        readOnly={this.props.readOnly || this.state.liveCustomComponentEdits.count()}
        customStyleMap={customStyleMap}
        blockRenderMap={blockRenderMap}
        blockRendererFn={this.blockRenderer.bind(this)}
        onChange={this.onChange.bind(this)}
        editorState={this.props.editorState}
        ref={(element) => {
          this.editor = element;
        }}
      />
    );
  }
}

export default CardEditor;
export customRichTextUtil from './customRichTextUtil';
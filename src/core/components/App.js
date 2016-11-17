import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  CompositeDecorator,
  Entity,
  RichUtils,
} from 'draft-js';
import Editor, { customRichTextUtil } from '../../editor';
import actions from '../actions';
import { createStyleMiddleWare, createCustomComponentMiddleWare } from '../../middleWares';
import styles from './App.css';
const styleMiddleWare = createStyleMiddleWare();
const { DefaultToolBar } = styleMiddleWare;
const customComponentMiddleWare = createCustomComponentMiddleWare();
const { DefaultToolBar:CustomComponentToolBar } = customComponentMiddleWare;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      readOnly: true,
    };
    this._focus = () => this.editorRef.focus();
    this._onChange = (editorState) => {
      this.setState({ editorState });
    };
    this._handleKeyCommand = (command) => {
      const { editorState } = this.state;
      // hack to delete atomic block on backspace
      if (command === 'backspace') {
        const newState = customRichTextUtil.onBackspace(editorState);
        if (newState) {
          this._onChange(newState);
          return true;
        }
        return false;
      }
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        this._onChange(newState);
        return true;
      }
      return false;
    };
  }

  componentWillReceiveProps(nextProps) {
    const { content } =nextProps;
    this.setState({
      editorState: content && !_.isEmpty(content) ?
        EditorState.createWithContent(convertFromRaw(content))
        : EditorState.createEmpty(),
    });
  }

  render() {
    const {} = this.props;
    const { editorState, readOnly } = this.state;
    return (
      <div>
        <div className={styles.controls} >
          <button onClick={() => {
            this.setState({ readOnly: !readOnly });
          }}
          >
            {readOnly ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="24" viewBox="0 0 24 24" width="24" >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
              </svg>) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="24" viewBox="0 0 24 24" width="24" >
                <path
                  d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>)}
          </button>
          <button onClick={() => {
            const { editorState } =this.state;
            const { updateContent } =this.props;
            const contentState = editorState.getCurrentContent();
            const rawContent = convertToRaw(contentState);
            updateContent(rawContent)
          }} >
            <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="24" viewBox="0 0 24 24" width="24" >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
            </svg>
          </button>
        </div>

        {!readOnly && DefaultToolBar}
        {!readOnly && CustomComponentToolBar}
        <div className={styles.container} onClick={this._focus} >
          <Editor
            key={readOnly}
            editorState={editorState}
            middleWares={[styleMiddleWare, customComponentMiddleWare]}
            handleKeyCommand={this._handleKeyCommand}
            placeholder={'add document here!'}
            readOnly={readOnly}
            onChange={this._onChange}
            ref={(ref) => {
              this.editorRef = ref;
            }}
          />
        </div>
      </div>
    );
  }
}
App.propTypes = {};
function mapStateToProps(state) {
  return {
    content: state.content,
  };
}
const { updateContent } =actions;
export default connect(mapStateToProps, { updateContent })(App);

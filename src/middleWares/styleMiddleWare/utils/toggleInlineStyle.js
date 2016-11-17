import {
  RichUtils,
  convertToRaw,
} from 'draft-js';
export default (inlineStyle, store) => {
  const editorState = store.getEditorState();
  const newEditorState = RichUtils.toggleInlineStyle(
    editorState,
    inlineStyle
  );
  store.setEditorState(
    newEditorState
  );
};
import {
  RichUtils,
  EditorState,
  Modifier,
} from 'draft-js';
export default (blockStyle, store) => {
  const editorState = store.getEditorState();
  if (RichUtils.getCurrentBlockType(editorState) === 'atomic') {
    return;
  }
  /**
   * for custom Header 3 need to add logic on block render as well
   if (RichUtils.getCurrentBlockType(editorState) !== 'header-three' && blockStyle === 'header-three') {
    const selection = editorState.getSelection();
    const content = editorState.getCurrentContent();
    const icon = prompt('Please enter font awesome Icon', 'fa-comments');
    const blockData = Map({ icon });
    store.setEditorState(RichUtils.toggleBlockType(
      EditorState.push(
        editorState,
        Modifier.setBlockData(content, selection, blockData),
        'change-block-data'
      ), blockStyle));
    return;
  }
   **/
  const newEditorState = RichUtils.toggleBlockType(
    editorState,
    blockStyle
  );
  store.setEditorState(
    newEditorState
  );
};
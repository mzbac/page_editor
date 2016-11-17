import {
  EditorState,
  RichUtils,
} from 'draft-js';
export default {
  onBackspace: (editorState) => {
    const selection = editorState.getSelection();
    if (
      !selection.isCollapsed() ||
      selection.getAnchorOffset() ||
      selection.getFocusOffset()
    ) {
      return null;
    }

    // First, try to remove a preceding atomic block.
    const content = editorState.getCurrentContent();
    const startKey = selection.getStartKey();
    const blockBefore = content.getBlockBefore(startKey);

    if (blockBefore && blockBefore.getType() === 'atomic') {
      const blockMap = content.getBlockMap().delete(blockBefore.getKey());
      const withoutAtomicBlock = content.merge({ blockMap, selectionAfter: selection });

      if (withoutAtomicBlock !== content) {
        return EditorState.push(editorState, withoutAtomicBlock, 'remove-range');
      }
    }
    // If that doesn't succeed, try to remove the current block style.
    const withoutBlockStyle = RichUtils.tryToRemoveBlockStyle(
      editorState
    );

    if (withoutBlockStyle) {
      return EditorState.push(
        editorState,
        withoutBlockStyle,
        'change-block-type'
      );
    }
    return null;
  },
};
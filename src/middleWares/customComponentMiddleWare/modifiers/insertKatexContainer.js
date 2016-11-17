import {
  AtomicBlockUtils,
  Entity,
  RichUtils,
} from 'draft-js';

import * as customType from '../constants';

export default (editorState) => {
  if (RichUtils.getCurrentBlockType(editorState) === 'atomic') {
    return editorState;
  }

  const entityKey = Entity.create(
    'TOKEN',
    'IMMUTABLE',
    {
      type: customType.KATEXCONTAINER,
      componentName: 'KatexComponent',
      data: {},
    }
  );

  return AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
}
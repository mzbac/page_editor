import { Entity } from 'draft-js';
import * as customType from '../constants';
import {
  SplitContainer,
  GenericContainer,
  KatexContainer,
} from '../containers';

export default function blockRenderHandle(block) {
  if (!block.getEntityAt(0)) {
    return null;
  }
  const type = Entity
    .get(block.getEntityAt(0))
    .getData().type;
  const _onStartEdit = (blockKey) => {
    const { liveCustomComponentEdits } = this.state;
    this.setState({ liveCustomComponentEdits: liveCustomComponentEdits.set(blockKey, true) },
      () => {
        setTimeout(() => this.editor.focus(), 0);
      });
  };
  const _onFinishEdit = (blockKey) => {
    const { liveCustomComponentEdits } = this.state;
    this.setState({ liveCustomComponentEdits: liveCustomComponentEdits.remove(blockKey) },
      () => {
        setTimeout(() => this.editor.focus(), 0);
      });
  };
  if (type === customType.SPLITCONTAINER) {
    return {
      component: SplitContainer,
      editable: false,
      props: {
        onStartEdit: _onStartEdit,
        onFinishEdit: _onFinishEdit,
        isReadOnly:this.props.readOnly,
      },
    };
  }
  if (type === customType.GENERICCONTAINER) {
    return {
      component: GenericContainer,
      editable: false,
      props: {
        onStartEdit: _onStartEdit,
        onFinishEdit: _onFinishEdit,
        isReadOnly:this.props.readOnly,
      },
    };
  }
  if (type === customType.KATEXCONTAINER) {
    return {
      component: KatexContainer,
      editable: false,
      props: {
        onStartEdit: _onStartEdit,
        onFinishEdit: _onFinishEdit,
        isReadOnly:this.props.readOnly,
      },
    };
  }
  return null;
}
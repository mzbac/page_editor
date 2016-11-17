import React, { Component, PropTypes } from 'react';
import { Entity } from 'draft-js';
import ReactDOM from 'react-dom';
import katex from 'katex';
import _ from 'lodash';

class InlineKatex extends Component {
  constructor(props) {
    super(props);
    this.update = _.debounce(this._update, 100);
  }

  componentDidMount() {
    this.update.cancel();
    this.update();
  }

  componentWillReceiveProps(nextProps) {
    const { katexContent } = Entity.get(this.props.entityKey).getData();
    const { katexContent: nextContent } = Entity.get(nextProps.entityKey).getData();
    if (nextContent !== katexContent) {
      this.update.cancel();
      this.update();
    }
  }

  componentWillUnmount() {
    this.update.cancel();
  }

  _update() {
    const { katexContent } = Entity.get(this.props.entityKey).getData();
    if (!katexContent) {
      return;
    }

    if (!this.katexRef && !ReactDOM.findDOMNode(this.katexRef)) {
      return;
    }
    katex.render(
      katexContent,
      this.katexRef,
      { displayMode: false }
    );
  }

  render() {
    return (
      <span
        ref={(ref) => {
          this.katexRef = ref;
        }}
      />
    );
  }
}
InlineKatex.propTypes = {};
export default InlineKatex;



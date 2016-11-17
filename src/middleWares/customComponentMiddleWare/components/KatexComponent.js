import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import katex from 'katex';
import _ from 'lodash';

import styles from './KatexComponent.css';

class KatexComponent extends Component {
  constructor(props) {
    super(props);
    this.update = _.debounce(this._update, 100);
  }

  componentDidMount() {
    this.update.cancel();
    this.update();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.content !== this.props.content) {
      this.update.cancel();
      this.update();
    }
  }

  componentWillUnmount() {
    this.update.cancel();
  }

  _update() {
    if (!this.props.content) {
      return;
    }

    if (!this.katexRef && !ReactDOM.findDOMNode(this.katexRef)) {
      return;
    }
    katex.render(
      this.props.content,
      this.katexRef,
      { displayMode: true }
    );
  }

  render() {
    return (
      <div className={styles.container} >
        <div
          ref={(ref) => {
            this.katexRef = ref;
          }}
        />
      </div>
    );
  }
}
KatexComponent.propTypes = {
  content: PropTypes.string,
};
export default KatexComponent;
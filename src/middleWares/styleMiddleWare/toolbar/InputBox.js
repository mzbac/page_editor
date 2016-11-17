import React, { Component, PropTypes } from 'react';

class InputBox extends Component {
  constructor() {
    super();
    this.state = {
      inputVal: '',
    };
  }

  render() {
    const { inputVal } =this.state;
    const { onInput, onInputReject } = this.props;
    if (!onInput) return null;
    return (
      <form className="form-inline" >
        <div className="form-group" >
          <input className="form-control" value={inputVal}
                 onChange={(event) => this.setState({ inputVal: event.target.value })} />
          <button className="btn btn-default" onClick={() => {
            onInput(inputVal);
          }} >save
          </button>
          <button className="btn btn-default" onClick={() => {
            onInputReject();
          }} >cancel
          </button>
        </div>
      </form>
    );
  }
}
InputBox.propTypes = {};
export default InputBox;


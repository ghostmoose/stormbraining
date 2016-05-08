import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { newBoard } from '../actions/index';

import './styles/board_input.scss';

class BoardInput extends Component {

  static propTypes = {
    newBoard: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = { board: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({ board: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.newBoard(this.state.board);
    this.setState({ board: '' });
  }

  render() {
    return (
      <div className="board-input-container">
        <form onSubmit={this.onFormSubmit} className="mui-input">
          <input
            placeholder="Name your brainstorm"
            className="mui-input board-input"
            value={this.state.board}
            onChange={this.onInputChange}
          />
            <button type="submit" className="mui-flat-button board-button">
              Submit
            </button>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ newBoard }, dispatch);
}

export default connect(null, mapDispatchToProps)(BoardInput);

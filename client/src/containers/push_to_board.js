import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import './styles/main.scss';

class PushToBoard extends Component {

  static propTypes = {
    params: PropTypes.object.isRequired,
    timedBoard: PropTypes.object.isRequired,
    pushTimedBoard: PropTypes.func.isRequired,
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { open: false };
    this.onPush = this.onPush.bind(this);
  }

  onPush() {
    this.handleClose();
    this.props.pushTimedBoard(this.props.params.timed_board_id)
      .then(() => {
        browserHistory.push(`/boards/${this.props.timedBoard.boardId}`);
      });
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  renderSelectionStatus() {
    const accentColor = this.context.muiTheme.palette.accent1Color;
    const selectionCount = this.props.timedBoard.timedIdeas.filter(idea => idea.selected).length;
    if (selectionCount) {
      return (
        <div>
          <p>You have <span style={{ color: accentColor }}>{selectionCount}</span> idea(s) selected.</p>
          <p>This will end your session and push your selected ideas back to the original board. Are you sure?</p>
        </div>
      );
    }
    return (
      <div>
        <p style={{ color: accentColor }}>You have {selectionCount} ideas selected.</p>
        <p>This will end your session without pushing any ideas back to the original board. Are you sure?</p>
      </div>
    );
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="OK"
        onTouchTap={this.onPush}
      />,
    ];

    return (
      <span>
        <RaisedButton
          type="button"
          className="idea-button"
          label="Push to Board"
          onTouchTap={this.handleOpen}
          disabled={this.props.timedBoard.completed}
        />
        <Dialog
          title="Push Ideas Back to Original Board"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          {this.renderSelectionStatus()}
        </Dialog>
      </span>
    );
  }
}

export default PushToBoard;

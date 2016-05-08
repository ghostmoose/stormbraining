import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import './styles/app.scss';

export default class App extends Component {

  static propTypes = { // this seems to be the preferred set-up
    children: PropTypes.object,
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <nav className="mui-app-bar mui-paper-container">
          <Link to="/" className="mui-app-bar-title">
            <span className="main-title"> Stormbraining </span>
          </Link>
          <button className="btn btn-default boards board-position">
            <Link to="/boards" className="mui-app-bar-navigation-icon-button boards-button">
              <span className="board-title">Boards</span>
            </Link>
          </button>
        </nav>
        {this.props.children}
      </div>
    );
  }
}

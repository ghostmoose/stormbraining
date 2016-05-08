import React from 'react';
import BoardInput from '../containers/board_input';
import BoardList from '../containers/board_list';

import '.styles/boards.scss';

const Boards = () => (
  <div>
    <h1 className="brainstorm"> Create a brainstorm </h1>
    <BoardInput />
    <BoardList />
  </div>
);

export default Boards;

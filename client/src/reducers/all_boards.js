import { NEW_BOARD, GET_BOARDS } from '../actions/action_types';

const INITIAL_STATE = [];

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case NEW_BOARD:
      return state.concat(action.payload.data.board);

    case GET_BOARDS:
      return action.payload.data.boards;

    default:
      return state;
  }
}

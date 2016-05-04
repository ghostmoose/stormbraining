import { NEW_IDEA, GET_ONE_BOARD, UP_VOTE } from '../actions/action_types';

const INITIAL_STATE = { title: '', ideas: [] };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case NEW_IDEA:
      const allIdeas = state.ideas.concat(action.payload.data.idea);
      return { ...state, ideas: allIdeas };

    case GET_ONE_BOARD:
      return action.payload.data.board;

    case UP_VOTE:
      const upvotedIdea = action.payload.data.idea;
      const indexOfUpdate = state.ideas.map(idea => idea.id).indexOf(upvotedIdea.id);
      let updatedIdeas = state.ideas.slice();
      updatedIdeas.splice(indexOfUpdate, 1, upvotedIdea);
      return { ...state, ideas: updatedIdeas };

    default:
      return state;
  }
}

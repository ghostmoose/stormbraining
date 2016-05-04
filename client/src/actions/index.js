import axios from 'axios';
import * as types from './action_types';

const ROOT_URL = '/api';

export function newIdea(idea, id) {
  const request = axios.post(`${ROOT_URL}/boards/${id}/ideas`, { content: idea });
  return {
    type: types.NEW_IDEA,
    payload: request,
  };
}

export function getOneIdea(id, ideaId) {
  const request = axios.get(`${ROOT_URL}/boards/${id}/ideas/${ideaId}`);
  return {
    type: types.GET_ONE_IDEA,
    payload: request,
  };
}

export function upVote(id, ideaId) {
  const request = axios.post(`${ROOT_URL}/boards/${id}/ideas/${ideaId}/upvotes`);
  return {
    type: types.UP_VOTE,
    payload: request,
  };
}

export function newBoard(title) {
  const boardRequest = axios.post(`${ROOT_URL}/boards`, { title });
  return {
    type: types.NEW_BOARD,
    payload: boardRequest,
  };
}

export function getBoards() {
  const request = axios.get(`${ROOT_URL}/boards`);
  return {
    type: types.GET_BOARDS,
    payload: request,
  };
}

export function getOneBoard(id) {
  const request = axios.get(`${ROOT_URL}/boards/${id}`);
  return {
    type: types.GET_ONE_BOARD,
    payload: request,
  };
}

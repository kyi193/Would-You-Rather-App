import { SET_AUTHED_USER, LOGIN_USER } from '../actions/authedUser';

export default function authedUser(state = null, action) {
  switch (action.type) {
    case SET_AUTHED_USER:
      return action.id;
    case LOGIN_USER:
      return action.id
    default:
      return state;
  }
}

import { RECEIVE_USERS } from '../actions/users';
import { ADD_USER_QUESTION, SUBMIT_USER_ANSWER } from '../actions/questions'
let newState;
export default function users(state = {}, action) {

  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }
    case ADD_USER_QUESTION:
      newState = { ...state };
      newState[action.author].questions.push(action.id);
      return newState;
    case SUBMIT_USER_ANSWER:
      newState = { ...state };
      newState[action.author].answers[action.id] = action.answer;
      return newState;
    default:
      return state;
  }
}

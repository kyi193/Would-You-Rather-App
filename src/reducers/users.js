import { RECEIVE_USERS } from '../actions/users';
import { ADD_USER_QUESTION, SUBMIT_USER_ANSWER } from '../actions/questions'

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }
    case ADD_USER_QUESTION:
      return {
        ...state,
        [action.author]: {
          ...state[action.author],
          questions: state[action.author].questions.concat(action.id)
        }
      }
    case SUBMIT_USER_ANSWER:
      return {
        ...state,
        [action.author]: {
          ...state[action.author],
          answers: Object.assign({}, state[action.author].answers, { [action.id]: action.answer })
        }
      }
    default:
      return state;
  }
}

import { saveQuestion } from '../utils/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION';


export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

function addUserQuestion(id, author) {
  return {
    type: ADD_USER_QUESTION,
    id,
    author
  }
}

export function handleAddQuestion(optionOne, optionTwo, authedUser) {
  console.log("User: ", authedUser)
  return (dispatch, getState) => {
    const { authedUser } = getState()
    return saveQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser
    })
      .then((question) => dispatch(addUserQuestion(question.id, question.author),
        dispatch(addQuestion(question))))

  }
}

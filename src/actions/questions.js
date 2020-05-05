import { saveQuestion, saveQuestionAnswer } from '../utils/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION';
export const SUBMIT_USER_ANSWER = 'SUBMIT_USER_ANSWER';
export const SUBMIT_QUESTION_ANSWER = 'SUBMIT_QUESTION_ANSWER';


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

function submitUserAnswer(id, author, answer) {
  return {
    type: SUBMIT_USER_ANSWER,
    id,
    author,
    answer,
  }
}

function submitQuestionAnswer(id, author, answer) {
  return {
    type: SUBMIT_QUESTION_ANSWER,
    id,
    author,
    answer,
  }
}

export function handleAddQuestion(optionOne, optionTwo, authedUser) {
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

export function handleSubmitAnswer(authedUser, id, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    return saveQuestionAnswer({
      authedUser,
      qid: id,
      answer,
    })
      .then(() => dispatch(submitUserAnswer(id, authedUser, answer),
        dispatch(submitQuestionAnswer(id, authedUser, answer))))

  }
}

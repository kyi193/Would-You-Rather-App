import React, { Component } from 'react'
import { connect } from 'react-redux'
import AnsweredQuestion from './AnsweredQuestion'

class AQDash extends Component {

  render() {
    const { question, users, authedUser } = this.props
    return (
      <AnsweredQuestion question={question} users={users} authedUser={authedUser} />
    )
  }
}

function mapStateToProps({ authedUser, users, questions }, props) {
  const { id } = props.match.params
  const question = questions[id]
  console.log(questions)
  return {
    authedUser,
    question,
    users,
    id,
  };
}

export default connect(mapStateToProps)(AQDash)


import React, { Component } from 'react'
import { connect } from 'react-redux'
import UQDash from './UQDash'
import { Redirect } from 'react-router-dom'
import Tabs from './Tabs'
import AnsweredQuestion from './AnsweredQuestion'

class Dashboard extends Component {
  render() {
    const userQuestionData = this.props
    const { authedUser, users, questions } = this.props
    if (userQuestionData.authedUser === null) {
      return <Redirect to='/login' />
    }
    return (
      <div class="dashboard">
        <Tabs>
          <div label="Would You Rather....">
            <ul className='dashboard-list'>
              {userQuestionData.unAnsweredQuestionIDs &&
                (userQuestionData.unAnsweredQuestionIDs.map((id) => (
                  <li key={id}>
                    <UQDash id={id} />
                  </li>
                )))}
            </ul>
          </div>
          <div label="Your Answers">
            <ul className='dashboard-list'>
              {userQuestionData.answeredQuestionIDs &&
                (userQuestionData.answeredQuestionIDs.map((id) => (
                  <li key={id}>
                    <AnsweredQuestion question={questions[id]} users={users} authedUser={authedUser} />
                  </li>
                )))}
            </ul>
          </div>
        </Tabs>
      </div>
    )
  }
}



function mapStateToProps({ questions, authedUser, users }) {
  let unansweredQuestionIDs;
  let answeredQuestionIDs;
  if (users[authedUser]) {
    answeredQuestionIDs = Object.keys(users[authedUser].answers)
    const answeredQuestionKeys = Object.keys(users[authedUser].answers)
    const questionKeys = Object.keys(questions)
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    unansweredQuestionIDs = questionKeys.filter(question => (
      !answeredQuestionKeys.includes(question)
    ))

  }

  return {
    unAnsweredQuestionIDs: unansweredQuestionIDs ? unansweredQuestionIDs : null,
    answeredQuestionIDs: answeredQuestionIDs ? answeredQuestionIDs : null,
    authedUser,
    authedUser,
    users,
    questions,
  }
}

export default connect(mapStateToProps)(Dashboard)

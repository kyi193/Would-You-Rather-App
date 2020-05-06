
import React, { Component } from 'react'
import { connect } from 'react-redux'
import UQDash from './UQDash'
import AQDash from './AQDash'
import NewQuestion from './NewQuestion'
import PollPage from './PollPage'
import Login from './Login'
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {
  render() {
    const userQuestionData = this.props
    if (userQuestionData.authedUser === null) {
      return <Redirect to='/login' />
    }
    return (
      <div>
        <h1>Dashboard</h1>
        <ul className='dashboard-list'>
          {userQuestionData.unAnsweredQuestionIDs &&
            (userQuestionData.unAnsweredQuestionIDs.map((id) => (
              <li key={id}>
                <PollPage id={id} />
              </li>
            )))}
        </ul>
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
    authedUser
  }
}

export default connect(mapStateToProps)(Dashboard)

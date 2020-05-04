import React, { Component } from 'react'
import { connect } from 'react-redux'
import UQDash from './UQDash'
import AQDash from './AQDash'

class Dashboard extends Component {
  render() {
    const userQuestionData = this.props
    console.log(userQuestionData.unAnsweredQuestionIDs)
    return (
      <div>
        <ul className='dashboard-list'>
          {userQuestionData.answeredQuestionIDs &&
            (userQuestionData.answeredQuestionIDs.map((id) => (
              <li key={id}>
                <AQDash id={id} />
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
  }
}

export default connect(mapStateToProps)(Dashboard)

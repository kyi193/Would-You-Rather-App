import React, { Component } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component {
  render() {
    const { userQuestionData } = this.props;
    return (
      <div>
        <ul className='dashboard-list'>
          {userQuestionData.unAnsweredQuestionIDs &&
            (userQuestionData.unAnsweredQuestionIDs.map((id) => (
              <li key={id}>
                <div>QUESTION ID: {id}</div>
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
    answeredQuestionIDs = users[authedUser].answers
    const answeredQuestionKeys = Object.keys(users[authedUser].answers)
    const questionKeys = Object.keys(questions)
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    unansweredQuestionIDs = questionKeys.filter(question => (
      !answeredQuestionKeys.includes(question)
    ))

  }

  return {
    unAnsweredQuestionIDs: unansweredQuestionIDs ? unansweredQuestionIDs : null,
    answeredQuestionsIDs: answeredQuestionIDs ? answeredQuestionIDs : null
  }
}

export default connect(mapStateToProps)(Dashboard)

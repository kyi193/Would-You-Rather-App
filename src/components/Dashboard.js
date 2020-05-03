import React, { Component } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <ul className='dashboard-list'>
          {this.props.unAnsweredQuestionIDs &&
            (this.props.unAnsweredQuestionIDs.map((id) => (
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
  let unansweredQuestionKeys;
  if (users[authedUser]) {
    const answeredQuestionKeys = Object.keys(users[authedUser].answers)
    const questionKeys = Object.keys(questions)
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    unansweredQuestionKeys = questionKeys.filter(question => (
      !answeredQuestionKeys.includes(question)
    ))

  }

  return {
    unAnsweredQuestionIDs: unansweredQuestionKeys ? unansweredQuestionKeys : null
  }
}

export default connect(mapStateToProps)(Dashboard)

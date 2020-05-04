import React, { Component } from 'react'
import { connect } from 'react-redux'

class AQDash extends Component {
  render() {
    const { question } = this.props;
    const { users } = this.props;
    const { authedUser } = this.props;
    if (question === null) {
      return <p>This question doesn't exist</p>
    }
    const {
      author, id, optionOne, optionTwo, timestamp
    } = question;
    const name = users[author].name
    const avatarURL = users[author].avatarURL
    const isOptionOne = question.optionOne.votes.includes(authedUser)
    const isOptionTwo = question.optionTwo.votes.includes(authedUser)
    console.log(optionOne, optionTwo, isOptionOne, isOptionTwo)
    if (isOptionOne) {
      return (
        <div className="unanswered-questionDash">
          <img
            src={avatarURL}
            alt={`Avatar of ${name}`}
            className='avatar'
          />
          <div>{name} Asks</div>
          <div>Would you rather...</div>
          <div>
            A. {optionOne.text} - <span><strong>You chose this answer!</strong></span>
            <br />
          Or.....
          <br />
          B. {optionTwo.text}
          </div>
        </div>
      )
    } else if (isOptionTwo) {
      return (
        <div className="unanswered-questionDash">
          <img
            src={avatarURL}
            alt={`Avatar of ${name}`}
            className='avatar'
          />
          <div>{name} Asks</div>
          <div>Would you rather...</div>
          <div>
            A. {optionOne.text}
            <br />
          Or.....
          <br />
          B. {optionTwo.text} - <span><strong>You chose this answer!</strong></span>
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id]
  return {
    authedUser,
    question,
    users
  };
}

export default connect(mapStateToProps)(AQDash)

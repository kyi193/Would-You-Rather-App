import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/_DATA';

class UQDash extends Component {
  render() {
    const { question } = this.props;
    const { users } = this.props;

    if (question === null) {
      return <p>This question doesn't exist</p>
    }
    const {
      author, id, optionOne, optionTwo, timestamp
    } = question;
    const name = users[author].name
    const avatarURL = users[author].avatarURL
    console.log(avatarURL)
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
          B. {optionTwo.text}
          <br />
          <button>View Poll</button>
        </div>
      </div>
    )
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

export default connect(mapStateToProps)(UQDash)

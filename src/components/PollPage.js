import React, { Component } from 'react'
import { connect } from 'react-redux'
class PollPage extends Component {
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
          <div>
            <input type="radio" id="optionOne" name="poll" value="optionOne"
              checked />
            <label for="optionOne">{optionOne.text}</label>
          </div>

          <div>
            <input type="radio" id="optionTwo" name="poll" value="optionTwo" />
            <label for="optionOne">{optionTwo.text}</label>
          </div>
          <button>Submit</button>
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

export default connect(mapStateToProps)(PollPage)

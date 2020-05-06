import React, { Component } from 'react'
import { connect } from 'react-redux'

class AQDash extends Component {

  render() {
    const { question, users, authedUser } = this.props;
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
    const optionOneTotal = question.optionOne.votes
      ? question.optionOne.votes.length
      : 0
    const optionTwoTotal = question.optionTwo.votes
      ? question.optionOne.votes.length
      : 0
    const voteTotal = optionOneTotal + optionTwoTotal
    const optionOnePercentage = ((optionOneTotal / voteTotal) * 100).toFixed(2)
    const optionTwoPercentage = ((optionTwoTotal / voteTotal) * 100).toFixed(2)
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
            {optionOneTotal} voted for this
          Or.....
          <br />
          B. {optionTwo.text}
            <br />
            <br />
            {optionTwoTotal} voted for this({optionOnePercentage}%)
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
            {optionOneTotal} voted for this
          Or.....
          <br />
          B. {optionTwo.text} - <span><strong>You chose this answer!</strong></span>
            <br />
            <br />
            {optionTwoTotal} voted for this({optionTwoPercentage}%)
          </div>
        </div>
      )
    }
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

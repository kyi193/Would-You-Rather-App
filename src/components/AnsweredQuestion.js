import React from 'react';

const AnsweredQuestion = ({ question, users, authedUser }) => {
  const tallyVotesForOption = (votes) => {
    return votes ? votes.length : 0
  }

  const tallyVotesPercentage = (numerator, denominator) => {
    return ((numerator / denominator) * 100).toFixed(2)
  }

  if (question === null) {
    return <p>This question doesn't exist</p>
  }
  const {
    author, id, optionOne, optionTwo, timestamp
  } = question;

  const name = users[author].name
  const avatarURL = users[author].avatarURL
  const isOptionOne = question.optionOne.votes.includes(authedUser)
  const optionOneTotal = tallyVotesForOption(question.optionOne.votes)
  const optionTwoTotal = tallyVotesForOption(question.optionTwo.votes)
  const voteTotal = optionOneTotal + optionTwoTotal
  const optionOnePercentage = tallyVotesPercentage(optionOneTotal, voteTotal)
  const optionTwoPercentage = (100 - optionOnePercentage).toFixed(2)
  const selectedAnswerSpan = (<span>- <strong>You chose this answer!</strong></span>)
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
        A. {optionOne.text}{isOptionOne && selectedAnswerSpan}
        <br />
        {optionOneTotal} voted for this({optionOnePercentage}%)
            <br />
          Or.....
          <br />
          B. {optionTwo.text}{!isOptionOne && selectedAnswerSpan}
        <br />
        {optionTwoTotal} voted for this({optionTwoPercentage}%)
          </div>
    </div>
  )
}

export default AnsweredQuestion

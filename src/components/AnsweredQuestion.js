import React from 'react';
import { Redirect } from 'react-router-dom'

const AnsweredQuestion = ({ question, users, authedUser, classTerm = null }) => {
  console.log(question, users, authedUser)
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
    author, optionOne, optionTwo
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
  if (authedUser === null) {
    return <Redirect to='/login' />
  }

  return (
    <div className={`answered-questionDash ${classTerm}`}>
      <div className='avatar-wrapper'>
        <img
          src={avatarURL}
          alt={`Avatar of ${name}`}
          className='avatar'
        />
      </div>
      <div className='uqName'><h3>{name} Asks:</h3></div>
      <div className='uqWouldYouRather'><h6>Would you rather...</h6></div>
      <div className='aqBod'>
        A. {optionOne.text}{isOptionOne && selectedAnswerSpan}
        <br />
        {optionOneTotal} voted for this({optionOnePercentage}%)
            <br />
        <div id='aqOr'>
          <h5>Or.....</h5>
        </div>
          B. {optionTwo.text}{!isOptionOne && selectedAnswerSpan}
        <br />
        {optionTwoTotal} voted for this({optionTwoPercentage}%)
          </div>
    </div>
  )
}

export default AnsweredQuestion

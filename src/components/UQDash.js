import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Link, withRouter } from 'react-router-dom'

class UQDash extends Component {
  viewPoll = (e, id) => {
    e.preventDefault()
    console.log(id)
    this.props.history.push(`/questions/${id}`);
  }
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
    if (authedUser === null) {
      return <Redirect to='/login' />
    }
    return (
      <div className="unanswered-questionDash">
        <div className='unanswered-question'>
          <div className='avatar-wrapper'>
            <img
              src={avatarURL}
              alt={`Avatar of ${name}`}
              className='avatar'
            />
          </div>
          <div className='uq-textbod'>
            <div className='uqName'><h3>{name} Asks:</h3></div>
            <div className='uqWouldYouRather'><h4>Would you rather...</h4></div>
            <div className='uqOption'>
              A. {optionOne.text}?
              <br />
              <div id='uqOr'>
                <h5>Or.....</h5>
              </div>
          B. {optionTwo.text}?
              <br />
            </div>
            <div className='button-wrapper'>
              <Link to={`/questions/${id}`} className='question'>
                <button
                  className='viewpoll'>
                  View Poll
            </button>
              </Link>
            </div>
          </div>
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

export default withRouter(connect(mapStateToProps)(UQDash))

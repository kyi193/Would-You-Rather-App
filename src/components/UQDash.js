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
          <Link to={`/questions/${id}`} className='question'>
            <button>
              View Poll
            </button>
          </Link>
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

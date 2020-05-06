import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSubmitAnswer } from '../actions/questions'
import { Redirect } from 'react-router-dom'
class PollPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      answer: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      answer: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { answer } = this.state
    const { dispatch, authedUser, id } = this.props
    dispatch(handleSubmitAnswer(authedUser, id, answer))
      .then(() => {
        this.props.history.push(`/answeredQuestion/${id}`)
      })

    this.setState(() => ({
      answer: '',
    }))
  }
  render() {
    const { question, users, authedUser } = this.props;
    const { answer } = this.state;
    if (authedUser === null) {
      return <Redirect to='/login' />
    }
    const {
      author, id, optionOne, optionTwo, timestamp
    } = question;
    const name = users[author].name
    const avatarURL = users[author].avatarURL
    return (
      <div className="unanswered-pollpage">
        <div className='avatar-wrapper'>
          <img
            src={avatarURL}
            alt={`Avatar of ${name}`}
            className='avatar'
          />
        </div>
        <div className='uqName'><h3>{name} Asks:</h3></div>
        <div className='uqWouldYouRather'><h2>Would you rather...</h2></div>
        <form onSubmit={this.handleSubmit}>
          <label className='pollAnswers'>
            <input
              type='radio'
              name="poll"
              value='optionOne'
              onChange={this.handleChange}
            />
            {optionOne.text}?
          </label>
          <br />
          <label className='pollAnswers'>
            <input
              type='radio'
              name="poll"
              value='optionTwo'
              onChange={this.handleChange}
            />
            {optionTwo.text}?
          </label>
          <br />
          <button
            type="submit"
            className='pollButton'
            disabled={answer === ''}>Submit Answer</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }, props) {
  const { id } = props.match.params
  const question = questions[id]
  return {
    authedUser,
    question,
    users,
    id
  };
}

export default connect(mapStateToProps)(PollPage)

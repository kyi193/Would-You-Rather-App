import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSubmitAnswer } from '../actions/questions'
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
    return (
      <div className="unanswered-pollpage">
        <img
          src={avatarURL}
          alt={`Avatar of ${name}`}
          className='avatar'
        />
        <div>{name} Asks</div>
        <div>Would you rather...</div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              type='radio'
              name="poll"
              value='optionOne'
              onChange={this.handleChange}
            />
            {optionOne.text}
          </label>
          <br />
          <label>
            <input
              type='radio'
              name="poll"
              value='optionTwo'
              onChange={this.handleChange}
            />
            {optionTwo.text}
          </label>
          <br />
          <button type="submit">Submit Answer</button>
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

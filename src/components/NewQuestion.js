import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
  }

  handleTextOneChange = (e) => {
    const optionOne = e.target.value
    this.setState(() => ({
      optionOne
    }))
  }
  handleTextTwoChange = (e) => {
    const optionTwo = e.target.value
    this.setState(() => ({
      optionTwo
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOne, optionTwo } = this.state
    const { dispatch, authedUser } = this.props
    dispatch(handleAddQuestion(optionOne, optionTwo, authedUser))
    this.setState(() => ({
      optionOne: '',
      optionTwo: '',
    }))
    this.props.history.push("/dashboard");
  }
  render() {
    const { optionOne, optionTwo } = this.state
    const { authedUser } = this.props
    if (authedUser === null) {
      return <Redirect to='/login' />
    }
    return (
      <div className='newquestion'>
        <h3 className='center'>Create New Question</h3>
        <form className='new-tweet' onSubmit={this.handleSubmit}>
          <input
            style={{ width: "300px" }}
            placeholder="Enter Option One Text Here..."
            value={optionOne}
            onChange={this.handleTextOneChange}
            className='textarea'
            maxLength={280}
          />
          <br />
          Or
          <br />
          <input
            style={{ width: "300px" }}
            placeholder="Enter Option Two Text Here..."
            value={optionTwo}
            onChange={this.handleTextTwoChange}
            className='textarea'
            maxLength={280}
          />
          <br />
          <button
            className='btn'
            submit='submit'
            disabled={optionOne === '' || optionTwo === ''}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}
function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  }
}
export default connect(mapStateToProps)(NewQuestion)

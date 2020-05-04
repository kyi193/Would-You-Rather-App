import React, { Component } from 'react'
import { connect } from 'react-redux'

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

  }
  render() {
    const { optionOne, optionTwo } = this.state

    return (
      <div>
        <h3 className='center'>Create New Question</h3>
        <form className='new-tweet' onSubmit={this.handleSubmit}>
          <textarea
            placeholder="Enter Option One Text Here"
            value={optionOne}
            onChange={this.handleTextOneChange}
            className='textarea'
            maxLength={280}
          />
          <br />
          Or
          <br />
          <textarea
            placeholder="Enter Option Two Text Here"
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

export default connect()(NewQuestion)

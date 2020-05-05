import React, { Component } from 'react'
import { connect } from 'react-redux'
import login_image from '../assets/login_image.jpg'
import "bootstrap/dist//css/bootstrap.min.css";
import { loginUser } from '../actions/authedUser'

class Login extends Component {
  state = {
    authedUser: '',
  }
  handleChange = (e) => {
    e.preventDefault()
    this.setState(({
      authedUser: e.target.value
    }))
  }
  submitLogin = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(loginUser(this.state.authedUser))
  }
  render() {
    const { userList, users } = this.props
    return (
      <div>
        <div className='login-title'>
          Login
          <div>
            Welcome to the Would You Rather App!
            <div>
              Please sign in to continue
            </div>
            <img
              className='login-image'
              src={login_image}
            />
            <h1>Sign In</h1>
            <div className="select">
              <select name="format" id="format" onChange={this.handleChange}>
                <option disabled defaultValue>Choose User</option>
                {userList.map(person => (
                  <option key={person} value={person}>{users[person].name}</option>
                ))}
              </select>
            </div>
            <div className="button">
              <button
                onClick={this.submitLogin}>Sign In</button>
            </div>
          </div>
        </div>

      </div>
    )
  }
}
function mapStateToProps({ users }) {
  let userList = Object.keys(users)
  return {
    userList,
    users
  }
}

export default connect(mapStateToProps)(Login)

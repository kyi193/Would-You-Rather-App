import React, { Component } from 'react'
import { connect } from 'react-redux'
import login_image from '../assets/login_image.jpg'

class Login extends Component {
  render() {
    const { userList } = this.props
    console.log(userList)
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
            <div>Sign In</div>
          </div>
        </div>

      </div>
    )
  }
}
function mapStateToProps({ authedUser, users }) {
  const userList = Object.keys(users)

  return {
    userList,
  }
}

export default connect(mapStateToProps)(Login)

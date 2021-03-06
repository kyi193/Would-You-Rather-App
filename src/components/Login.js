import React, { Component } from 'react'
import { connect } from 'react-redux'
import login_image from '../assets/login_image.jpg'
import "bootstrap/dist//css/bootstrap.min.css";
import { loginUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: 0,
      componentDidUpdateCount: 0
    }
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState(({
      selectedIndex: e.nativeEvent.target.selectedIndex
    }))
  }
  submitLogin = (e) => {
    e.preventDefault()
    if (!this.props.userList || this.props.userList.length === 0) {
      console.log("Error, user list not loaded yet")
      return;
    }
    const { dispatch, userList } = this.props
    dispatch(loginUser(userList[this.state.selectedIndex - 1]))
    this.props.history.push("/dashboard");
  }
  render() {
    const { userList, users, authedUser } = this.props
    const { selectedIndex } = this.state
    if (authedUser) {
      return <Redirect to='/dashboard' />
    }
    return (
      <div className='login-title'>
        <div>
          <div className='login-header'>
            Welcome to the Would You Rather App!
            <br />
            <p>Please sign in to continue</p>
          </div>
          <img
            className='login-image'
            src={login_image}
          />
          <h1 className='login-signin'>Sign In</h1>
          <div className="select">
            <select name="format" id="format" onChange={this.handleChange}>
              <option value="" defaultValue>Choose User...</option>
              {userList.map((person, index) => (
                <option key={person} value={person}>{users[person].name}</option>
              ))}
            </select>
          </div>
          {selectedIndex === 0 ? (
            <div className='login'>
              <button
                className="login-button"
                onClick={this.submitLogin}
                disabled={selectedIndex === 0}><span>Must Choose User</span></button>
            </div>
          ) : (<div className='login'>
            <button
              className="login-button-ready"
              onClick={this.submitLogin}
              disabled={selectedIndex === 0}><span className='login-ready'>Log In!</span></button>
          </div>)}

        </div>

      </div >
    )
  }
}
function mapStateToProps({ users, authedUser }) {
  let userList = Object.keys(users)
  return {
    userList,
    users,
    authedUser,
  }
}

export default connect(mapStateToProps)(Login)

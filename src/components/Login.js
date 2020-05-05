import React, { Component } from 'react'
import { connect } from 'react-redux'
import login_image from '../assets/login_image.jpg'
import "bootstrap/dist//css/bootstrap.min.css";
import { loginUser } from '../actions/authedUser'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault()
    const value = event.target.value
    console.log(value)
    const { dispatch } = this.props


    dispatch(loginUser(value))
  }
  render() {
    const { userList, users } = this.props
    return (
      <div>
        <div className='login-title'>
          Login <p>{this.state.value}</p>
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
          </div>
        </div>

      </div>
    )
  }
}
function mapStateToProps({ authedUser, users }) {
  let userList = Object.keys(users)
  console.log("USERS: ", userList)
  return {
    userList,
    users
  }
}

export default connect(mapStateToProps)(Login)

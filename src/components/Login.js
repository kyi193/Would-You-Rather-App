import React, { Component } from 'react'
import { connect } from 'react-redux'
import login_image from '../assets/login_image.jpg'
import "bootstrap/dist//css/bootstrap.min.css";

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
    this.setState({ value: event.target.value });
  }
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
            <h1>Sign In</h1>
            <div className="select">
              <select name="format" id="format" onChange={this.handleChange}>
                <option value disabled>Choose User</option>
                {userList.map(user => (
                  <option key={user} value={user}>{user}</option>
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
  let userList = [];
  for (const user in users) {
    userList.push(users[user].name)
  }
  console.log("USERS: ", userList)
  return {
    userList,
  }
}

export default connect(mapStateToProps)(Login)

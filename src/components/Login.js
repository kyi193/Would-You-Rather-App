import React, { Component } from 'react'
import { connect } from 'react-redux'
import login_image from '../assets/login_image.jpg'
import "bootstrap/dist//css/bootstrap.min.css";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

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
            <DropdownButton id="dropdown-item-button" title="Dropdown button">
              <Dropdown.Item as="button">Action</Dropdown.Item>
              <Dropdown.Item as="button">Another action</Dropdown.Item>
              <Dropdown.Item as="button">Something else</Dropdown.Item>
            </DropdownButton>
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

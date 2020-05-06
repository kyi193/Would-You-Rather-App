import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../actions/authedUser'
import { NavLink } from 'react-router-dom';

class Navbar extends Component {
  handleLogOut = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(logoutUser())
    // this.props.history.push("/login");
  }
  render() {
    const { authedUser, users } = this.props;
    let avatarURL
    if (!authedUser) {
      return <h5 style={{ color: "red" }}>User not logged in</h5>
    } else {
      avatarURL = users[authedUser].avatarURL
    }
    return (
      <div class="navbar">
        <NavLink to='/add' exact activeClassName='active'>
          New Question
        </NavLink>
        <NavLink to='/dashboard' exact activeClassName='active'>
          Home
        </NavLink>
        <span>{users[authedUser].name}</span>
        <img src={avatarURL && avatarURL} />
        <button
          onClick={this.handleLogOut}>Logout</button>
      </div>
    )
  }
}
function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users
  }
}
export default connect(mapStateToProps)(Navbar)

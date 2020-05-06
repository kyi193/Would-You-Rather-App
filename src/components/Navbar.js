import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../actions/authedUser'

class Navbar extends Component {
  handleLogOut = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(logoutUser())
    // this.props.history.push("/login");
  }
  render() {
    const { authedUser } = this.props;
    if (!authedUser) {
      return <h5 style={{ color: "red" }}>User not logged in</h5>
    }
    return (
      <div>
        {authedUser}
        <button
          onClick={this.handleLogOut}>Logout</button>
      </div>
    )
  }
}
function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  }
}
export default connect(mapStateToProps)(Navbar)

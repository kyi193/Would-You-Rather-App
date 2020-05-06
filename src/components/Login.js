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

  /* componentDidUpdate() {
    No need to check if userList exists in props if we just keep a default index.
    So, no weird checks to see if userList exists before setting the state.
  }*/

  handleChange = (e) => {
    e.preventDefault()
    // event.nativeEvent.target.selectedIndex is provided by the HTML
    // framework, where the selected index is always tracked for <option>
    // So, set state accordingly.
    this.setState(({
      selectedIndex: e.nativeEvent.target.selectedIndex
    }))
  }
  submitLogin = (e) => {
    e.preventDefault()
    /* As a safety measure, we prevent this from happening if userList
       does not exist, or if the list is empty.
       Without this, user can swiftly click submit before props are retrieved
       from the redux store..

       1. This is kinda hacky
       2. Not sure what the actual convention is but..
       3. Prepare for a possible fix --- keep track of some isLoading
          global prop in the redux store.

    */
    if (!this.props.userList || this.props.userList.length === 0) {
      console.log("Error, wait for me the load bro")
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
                <option value="" defaultValue>Choose User</option>
                {userList.map((person, index) => (
                  <option key={person} value={person}>{users[person].name}</option>
                ))}
              </select>
            </div>
            <div className="button">
              <button
                onClick={this.submitLogin}
                disabled={selectedIndex === 0}>Sign In</button>
            </div>
          </div>
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


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';
import Login from './Login';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './Navbar'
import NewQuestion from './NewQuestion';
class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    const { authedUser } = this.props;
    return (
      <React.Fragment>
        <Router>
          <Navbar />
          <Route exact path='/' exact component={Login} />
          <Route exact path='/dashboard' exact component={Dashboard} />
          <Route exact path='/login' exact component={Login} />
          <Route exact path='/add' exact component={NewQuestion} />
        </Router>
      </React.Fragment>
    )
  }
}
function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}
export default connect(mapStateToProps)(App)

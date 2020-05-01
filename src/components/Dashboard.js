import React, { Component } from 'react'

class Dashboard extends Component {
  render() {
    return (
      <div>
        Dashboard
      </div>
    )
  }
}

function mapStateToProps({ questions }) {
  return {
    questionIDs: Object.keys(questions)
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default Dashboard

import React, { Component } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <ul className='dashboard-list'>
          {this.props.questionIDs.map((id) => (
            <li key={id}>
              <div>QUESTION ID: {id}</div>
            </li>
          ))}
        </ul>
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

export default connect(mapStateToProps)(Dashboard)

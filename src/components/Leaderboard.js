import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Leaderboard extends Component {
  render() {
    const { sortedUserList, users, authedUser } = this.props;
    if (authedUser === null) {
      return <Redirect to='/login' />
    }
    return (
      <div className='leaderboard'>
        {sortedUserList && (
          sortedUserList.map((user) => (
            <div className='leaderboard-item'>
              <img className="leaderboard-image" src={users[user.name].avatarURL} />
              <div className="leaderboard-stats" >
                <span className='leaderboard-name'><h3><strong>{users[user.name].name}</strong></h3></span>
                <h6>Answered Questions: {user.answerCount}</h6>
                <h6>Created Questions: {user.questionCount}</h6>
              </div>
              <div className="leaderboard-score-wrapper">
                <div className="leaderboard-score" >
                  <div className="leaderboard-score-title">
                    Score
                  </div>
                  <div>
                    <h1 className="leaderboard-totalscore">{user.answerCount + user.questionCount}</h1>
                  </div>
                </div>
              </div>


            </div>
          ))
        )}
      </div>
    )
  }
}

function mapStateToProps({ users, authedUser }) {
  const sortedUserList = [];
  for (const user in users) {
    const answerCount = Object.keys(users[user].answers).length
    const questionCount = Object.keys(users[user].questions).length
    sortedUserList.push({
      name: user,
      answerCount,
      questionCount,
      count: answerCount + questionCount
    })
  }
  console.log(sortedUserList)
  sortedUserList.sort((a, b) => (a.count < b.count) ? 1 : -1)
  return {
    sortedUserList,
    users,
    authedUser,
  }
}
export default connect(mapStateToProps)(Leaderboard)

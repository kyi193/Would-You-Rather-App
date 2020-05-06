import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {
  render() {
    const { sortedUserList, users } = this.props;
    return (
      <div className='leaderboard'>
        {sortedUserList && (
          sortedUserList.map((user) => (
            <div>
              <div>
                <img src={users[user.name].avatarURL} />
                <div>
                  <span>{users[user.name].name}</span>
                  <h5>Answered Questions: {user.answerCount}</h5>
                  <h5>Created Questions: {user.questionCount}</h5>
                </div>
                <div>
                  <div>
                    Score
                  </div>
                  <div>
                    <h2>{user.answerCount + user.questionCount}</h2>
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

function mapStateToProps({ users }) {
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
  }
}
export default connect(mapStateToProps)(Leaderboard)

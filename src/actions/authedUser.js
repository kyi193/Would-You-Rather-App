export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id,
  }
}

export function loginUser(id) {
  console.log("loginUser ACTION")
  console.log(id);
  return {
    type: LOGIN_USER,
    id,
  }
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
  }
}

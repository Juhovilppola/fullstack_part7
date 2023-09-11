import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import storageService from '../services/storage'
import { setNotification } from './notificationReducer'


const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {

    saveUser(state, action) {
      storageService.saveUser(action.payload)
      return action.payload
    },
    removeUser(state, action) {
      storageService.removeUser()
      return null
    },
    setUser(state, action) {
      console.log('setuser')
      console.log(action.payload)
      return action.payload
    }

  }
})
export const { saveUser, removeUser, setUser } = userSlice.actions

export const initializeUser = () => {
  return async dispatch => {
    const user = storageService.loadUser()
    dispatch(setUser(user))
  }
}

export const loginUser = user => {
  return async dispatch => {
    const password = user.password
    const username = user.username
    try {
      const userToLogin = await loginService.login({ username, password })
      console.log(userToLogin)
      dispatch(saveUser(userToLogin))
    } catch (e) {
      dispatch(setNotification({ message: 'wrong username or password', type: 'error' }, 2))
    }
  }
}
export const logoutUser = () => {
  return async dispatch => {
    dispatch(removeUser())
  }

}
export default userSlice.reducer
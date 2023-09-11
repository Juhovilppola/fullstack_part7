import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, removeUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)


  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(event)
    //await login(username, password)
    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ''
    event.target.password.value = ''
    const user = {
      username: username,
      password: password
    }
    try {
      dispatch(loginUser(user))
      dispatch(setNotification({ message: 'welcome!', type: 'info' }, 2))
    } catch (e) {
      dispatch(setNotification({ message: 'wrong username or password', type: 'error' }, 2))
    }
  }

  const logout = () => {

    dispatch(removeUser())
    dispatch(setNotification({ message: 'Logged out', type: 'info' }, 2))

  }
  if (!user) {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group>

          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
          />


          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
          />

          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    )
  }
  return (
    <div>
      {user.name} logged in
      <Button onClick={logout}>logout</Button>
    </div>
  )
}

export default LoginForm
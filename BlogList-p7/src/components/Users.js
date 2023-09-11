import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import blogs from '../services/blogs'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
const ShowUser = ({ user }) => {

  const style = {
    marginBottom: 2,
    padding: 5,
    borderStyle: 'solid'
  }
  return (
    <tr>
      <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
      <td>{user.blogs.length}</td>
    </tr>

  )
}
const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  const user = useSelector(({ user }) => user)

  if (!user || !users) {
    return null
  }
  /*<tbody>
          {users.map(user =>
            <ShowUser
              key={user.id}
              user={user}
            />
          )}
        </tbody>*/
  return (
    <div>
      <h2>Users</h2>

      <Table striped>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>
                {user.blogs.length}
              </td>
            </tr>


          )}

        </tbody>

      </Table>

    </div>

  )
}

export default Users
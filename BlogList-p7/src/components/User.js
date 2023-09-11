import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Blogs from '../services/blogs'

const ShowTitle = ({ blog }) => {
  return (
    <li>
      {blog}
    </li>
  )
}

const User = () => {
  const id = window.location.pathname.slice(7)
  console.log(id)
  console.log(window.location.pathname)
  const user = useSelector(({ users }) => {
    try {
      return users.find(user => user.id === id)
    } catch (e) {
      return null
    }
  })
  if (!user) {
    return null
  }
  //const user = users.find(user => user.id === id)
  console.log(user)

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog =>
          <ShowTitle
            key={blog.id}
            blog={blog.title}
          />
        )}
      </ul>
    </div>
  )
}
export default User
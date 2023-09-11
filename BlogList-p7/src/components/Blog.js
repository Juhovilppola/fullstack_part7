import { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import blogs from '../services/blogs'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
const ShowBlog = ({ blog }) => {
  console.log('showBlog')
  const [visible, setVisible] = useState(false)
  const style = {
    marginBottom: 2,
    padding: 5,
    borderStyle: 'solid'
  }
  /*return (

    <div style={style} className='blog'>
      <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
    </div>
  )*/
  return (

    <td>
      <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
    </td>
  )

  /*return (
    <div style={style} className='blog'>
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'show'}
      </button>
      {visible &&
        <div>
          <div> <a href={blog.url}> {blog.url}</a> </div>
          <div>likes {blog.likes} <button onClick={like}>like</button></div>
          <div>{blog.user && blog.user.name}</div>
          {canRemove && <button onClick={remove}>delete</button>}
        </div>
      }
    </div>
  )*/
}

const Blog = () => {
  //const [visible, setVisible] = useState(false)
  // eslint-disable-next-line no-undef
  const dispatch = useDispatch()
  const blogsToShow = useSelector(state => state.blogs)
  const user = useSelector(({ user }) => user)
  console.log(user)
  //console.log('blogstoshow')
  //console.log(blogsToShow)
  //console.log(blogs)
  const style = {
    marginBottom: 2,
    padding: 5,
    borderStyle: 'solid'
  }

  const arrayToSort = [...blogsToShow]
  arrayToSort.sort((a, b) => b.likes - a.likes)
  const canRemove = true
  if (!blogs || !user) {
    return null
  }
  //console.log(blogs)
  //<Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
  return (

    <div>
      <Table striped>
        <tbody>
          {arrayToSort.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td>
                {blog.author}
              </td>


            </tr>
          )}

        </tbody>
      </Table>

    </div >
  )
}

Blog.propTypes = {
  //like: PropTypes.func.isRequired,
  //remove: PropTypes.func.isRequired,
  //canRemove: PropTypes.bool,
  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number
  })
}

export default Blog
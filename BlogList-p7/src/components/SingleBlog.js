import { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, removeBlog, commentBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'


const Comments = ({ comment }) => {
  return (
    <li>
      {comment}
    </li>
  )
}

const SingleBlog = () => {
  //const [visible, setVisible] = useState(false)
  // eslint-disable-next-line no-undef
  const dispatch = useDispatch()
  const id = window.location.pathname.slice(7)
  const blog = useSelector(({ blogs }) => {
    try {
      return blogs.find(blog => blog.id === id)
    } catch (e) {
      return null
    }
  })
  const user = useSelector(({ user }) => user)
  if (!blog || !user) {
    return null
  }

  console.log(user)
  const style = {
    marginBottom: 2,
    padding: 5,
    borderStyle: 'solid'
  }
  const like = async (blog) => {
    console.log('like')
    dispatch(likeBlog(blog))
    dispatch(setNotification({ message: `A like for the blog '${blog.title}' by '${blog.author}'`, type: 'info' }, 2))
  }

  const remove = async (blog) => {
    const ok = window.confirm(`Sure you want to remove '${blog.title}' by ${blog.author}`)
    if (ok) {
      dispatch(setNotification({ message: `The blog' ${blog.title}' by '${blog.author} removed`, type: 'info' }, 2))
      dispatch(removeBlog(blog.id))
    }

  }
  let canRemove = false
  if (user) {
    if (blog.user.username === user.username) {
      canRemove = true
    }
  }
  const handleSubmit = async (event) => {
    console.log('handle submit')
    console.log(event)
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    console.log(comment)
    const comments = blog.comments.concat(comment)


    console.log(comments)
    console.log(blog.comments)

    const blogToUpdate = { ...blog, comments: comments, user: blog.user.id }
    console.log('blog to update')
    console.log(blogToUpdate)
    const notifyWith = (message, type = 'info') => {
      dispatch(setNotification({
        message, type
      }, 3))
    }
    dispatch(commentBlog(blogToUpdate))
    const notificationMessage = `you commented '${blog.title}' by ${blog.author}`
    notifyWith(notificationMessage)

  }


  return (
    <div >
      <h2>{blog.title} {blog.author}</h2>

      <div>
        <div> <a href={blog.url}> {blog.url}</a> </div>
        <div>likes {blog.likes} <Button onClick={() => like(blog)}>like</Button></div>
        <div>added by {blog.user.name}</div>
        {canRemove && <Button onClick={remove}>delete</Button>}
      </div>
      <h3>comments</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Label>comment:</Form.Label>
        <Form.Control
          type="text"
          name="comment"
        />
        <Button variant="primary" type="submit">
          add comment
        </Button>
      </Form>
      <ul>{blog.comments.map(comment =>
        <Comments
          key={comment}
          comment={comment}
        />
      )}</ul>
    </div>
  )

}

SingleBlog.propTypes = {

  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number
  })
}

export default SingleBlog
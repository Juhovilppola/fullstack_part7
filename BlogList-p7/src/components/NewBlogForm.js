import { useDispatch } from 'react-redux'
import { createBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const NewBlogForm = () => {
  const dispatch = useDispatch()


  const handleSubmit = async (event) => {
    console.log('handle submit')
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    const blog = {
      title: title,
      author: author,
      url: url,
      likes: 0,
      comments: []
    }
    console.log(blog)
    const notifyWith = (message, type = 'info') => {
      dispatch(setNotification({
        message, type
      }, 3))
    }
    dispatch(createBlogs(blog))
    const notificationMessage = `you added '${title}' by ${author}`
    notifyWith(notificationMessage)

  }

  return (
    <div>
      <h2>Create new</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>title</Form.Label>
          <Form.Control
            type="text"
            name="title"
          />


          <Form.Label>author</Form.Label>
          <Form.Control
            type="text"
            name="author"
          />

          <Form.Label>url</Form.Label>
          <Form.Control
            type="text"
            name="url"
          />

          <Button variant="primary" type="submit">
            create
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default NewBlogForm
import { createSlice } from '@reduxjs/toolkit'
import blogs from '../services/blogs'

const sclice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {

    like(state, action) {
      const id = action.payload
      const toLike = state.find(s => s.id === id)
      const liked = { ...toLike, likes: toLike.likes + 1 }
      return state.map(s => s.id === id ? liked : s)
    },
    replaceBlog(state, action) {
      const replaced = action.payload
      return state.map(s => s.id === replaced.id ? replaced : s)
    },
    addBlog(state, action) {
      return state.concat(action.payload)
    },
    setBlogs(state, action) {
      console.log('set')
      return action.payload
    },
    remove(state, action) {
      console.log('remove')
      const id = action.payload
      return state.filter(s => s.id !== id)

    }
  }
})
export const { addBlog, like, replaceBlog, setBlogs, remove } = sclice.actions
export const initializeBlogs = () => {
  console.log('initializeBlogs')
  return async dispatch => {
    const blog = await blogs.getAll()
    dispatch(setBlogs(blog))
  }
}

export const createBlogs = (object) => {
  console.log('create blog')
  console.log(object)
  return async dispatch => {
    const blog = await blogs.create(object)
    dispatch(addBlog(blog))
  }
}

export const likeBlog = (object) => {
  console.log(object)
  const toLike = { ...object, likes: object.likes + 1 }
  console.log(toLike)
  return async dispatch => {
    const blog = await blogs.update(toLike)
    dispatch(replaceBlog(blog))
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogs.remove(id)
    dispatch(remove(id))
  }
}
export const commentBlog = (object) => {
  return async dispatch => {
    console.log(object)
    const blog = await blogs.updateComments(object)
    console.log(blog)
    dispatch(replaceBlog(blog))
  }
}

export default sclice.reducer

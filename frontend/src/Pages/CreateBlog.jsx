import React from 'react'
import BlogForm from '../components/BlogForm'
import '../CSS/CreateBlog.css'

const CreateBlog = () => {
  return (
    <div>
      <h1 className="heading">Create Your Blog</h1>
      <BlogForm/>
    </div>
  )
}

export default CreateBlog

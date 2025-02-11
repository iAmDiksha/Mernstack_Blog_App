import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import '../CSS/Blog.css'

const Blog = () => {
    const {id} = useParams()
    const blog = useSelector((state) => state.blogs.blogs.find((blog) => blog._id === id));

    if (!blog) {
        return <p>Blog not found!</p>;
      }
  return (
    <div className='ablog'>
        <h1>{blog.title}</h1>
        <div className="image">
            <img src={blog.image} alt="image" />
        </div>
        <p className='blogauthor'><i class="ri-user-3-line"></i> Author: {blog.author}</p>
        <p className='blogtime'><i class="ri-timer-line"></i> {blog.time} Minutes to Read</p>
        <article>
            {blog.content}
        </article>
    </div>
  )
}

export default Blog

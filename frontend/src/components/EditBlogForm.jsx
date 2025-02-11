import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editBlog } from '../redux/blogs/blogsSlice';
import { useParams, useNavigate } from 'react-router-dom';

const EditBlogForm = () => {
  const { id } = useParams(); // Get the blog ID from the route params
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  // Get the existing blog post from the Redux store
  const blog = useSelector((state) => state.blogs.blogs.find((blog) => blog._id === id));

  // Local state for the form inputs
  const [title, setTitle] = useState(blog ? blog.title : '');
  const [content, setContent] = useState(blog ? blog.content : '');
  const [time, setTime] = useState(blog ? blog.time : '');
  const [image, setImage] = useState(blog ? blog.image: '');
  const [author,setAuthor] = useState(blog? blog.author: '');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the editBlog action with the updated title and content
    dispatch(editBlog({ id, title, content, author, time, image }));
    alert('Blog updated successfully!');
    navigate('/blogs'); // Redirect back to the blog list
  };

  if (!blog) {
    return <p>Blog not found!</p>;
  }

  return (
    <form onSubmit={handleSubmit} className='form'>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />
      <div>
        <input
          type="String"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          placeholder="Author Name"
        />
      </div>
      <textarea
        placeholder="Content"
        value={content}
        rows={20}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditBlogForm;

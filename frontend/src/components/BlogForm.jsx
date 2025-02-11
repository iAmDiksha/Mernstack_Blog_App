import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "../redux/blogs/blogsSlice";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [time, setTime] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content && time) {
      const newBlog = {
        title,
        content,
        author,
        time,
        image,
      };
      dispatch(addBlog(newBlog));
      setTitle("");
      setContent("");
      setAuthor("");
      setTime("");
      setImage("");
      alert('Blog Created successfully!');
      navigate('/blogs')
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Enter Title of your blog"
        />
      </div>
      <div>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
          placeholder="Image URL"
        />
      </div>
      <div>
        <input
          type="number"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          placeholder="Time taken to read blog (in Minutes)"
        />
      </div>
      <div>
        <input
          type="String"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          placeholder="Author Name"
        />
      </div>
      <div>
        <textarea 
          value={content}
          rows={20}
          onChange={(e) => setContent(e.target.value)}
          required
          placeholder="Enter Content of your blog"
        />
      </div>
      <button type="submit">Add Blog</button>
    </form>
  );
};


export default BlogForm

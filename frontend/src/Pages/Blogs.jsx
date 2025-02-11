import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteBlog, fetchBlogs } from "../redux/blogs/blogsSlice";
import "../CSS/bloglist.css";  // Import the BlogList CSS
import { Link } from "react-router-dom";

const BlogList = () => {
  const blogs = useSelector((state) => Array.isArray(state.blogs?.blogs) ? state.blogs.blogs : []);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.blogs.loading);
  const error = useSelector((state) => state.blogs.error);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleDelete = (id) => {
    dispatch(deleteBlog(id))
      .then(() => {
        alert('Blog deleted successfully!');
        window.location.reload();
      })
      .catch(() => {
        alert('Failed to delete the blog. Please try again.');
      });
  };


  return (
    <div>
      {blogs.length === 0 ? (
        <p className="noblog">No blogs available. <Link to={"/create"} className="underline">Create a new blog.</Link> </p>
      ) : (
        <div className="blogs">{
        blogs.map((blog) => (
          <div key={blog._id} className="blog">
            <div className="img">
              <img src={blog.image} alt="image" />
            </div>
            <h2 className="blogtitle">{blog.title}</h2>
            <p className="blogcontent">{blog.content}</p>
            <p className="blogtime"><i className="ri-timer-line"></i> {blog.time} minutes</p>
            <div className="flex">
            <Link to={`/blog/${blog._id}`} className="readmore">Read More <i className="ri-arrow-right-up-line"></i></Link>
            <div>
            <Link to={`/edit/${blog._id}`}>
                <button className="edit btn"><i className="ri-edit-box-line"></i></button> 
            </Link>
            <button className="delete btn" onClick={() => handleDelete(blog._id)}><i className="ri-delete-bin-6-line"></i></button>
            </div>
            </div>
          </div>
        ))
        }
        </div>
      )}
    </div>
  );
};

export default BlogList;

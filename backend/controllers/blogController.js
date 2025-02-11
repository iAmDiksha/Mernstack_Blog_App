const Blog = require('../models/Blog');

// Get all blogs
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error });
  }
};

// Get a single blog by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog', error });
  }
};

// Create a new blog
const createBlog = async (req, res) => {
    const { title, content, author, time, image } = req.body;
    try {
      const newBlog = new Blog({ title, content, author, time, image });
      await newBlog.save();

       // Push blog reference to the user
    user.blogs.push(newBlog._id);
    await user.save();

      res.status(201).json(newBlog);
    } catch (error) {
      res.status(500).json({ message: 'Error creating blog', error });
    }
};

// Update a blog by ID
const updateBlog = async (req, res) => {
    const { title, content, author, time, image } = req.body;
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        { title, content, author, time, image },
        { new: true }
      );
      if (!updatedBlog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      res.json(updatedBlog);
    } catch (error) {
      res.status(500).json({ message: 'Error updating blog', error });
    }
};

// Delete a blog by ID
const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog', error });
  }
};

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};

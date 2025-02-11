// src/features/blogs/blogsSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../../axiosInstance'; 

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
  const response = await axiosInstance.get('/api/blogs');
  return response.data;
});

export const addBlog = createAsyncThunk('blogs/addBlog', async (newBlog) => {
  const response = await axiosInstance.post('/api/blogs', newBlog);
  return response.data;
});

export const editBlog = createAsyncThunk('blogs/editBlog', async (updatedBlog) => {
  const response = await axiosInstance.put(`/api/blogs/${updatedBlog.id}`, updatedBlog);
  return response.data;
});

export const deleteBlog = createAsyncThunk('blogs/deleteBlog', async (id) => {
  await axiosInstance.delete(`/api/blogs/${id}`);
  return id;
});

const initialState = {
  blogs: [],
  loading: false,
  error: null,
};

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchBlogs
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.loading = false;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Error fetching blogs';
      })

      // Handle addBlog
      .addCase(addBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
        state.loading = false;
      })
      .addCase(addBlog.rejected, (state) => {
        state.loading = false;
        state.error = 'Error adding blog';
      })

      // Handle editBlog
      .addCase(editBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editBlog.fulfilled, (state, action) => {
        const { id, title, content, author, time, image } = action.payload;
        const existingBlog = state.blogs.find((blog) => blog._id === id);
        if (existingBlog) {
          existingBlog.title = title;
          existingBlog.content = content;
          existingBlog.author = author;
          existingBlog.time = time;
          existingBlog.image = image;
        }
        state.loading = false;
      })
      .addCase(editBlog.rejected, (state) => {
        state.loading = false;
        state.error = 'Error editing blog';
      })

      // Handle deleteBlog
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteBlog.rejected, (state) => {
        state.loading = false;
        state.error = 'Error deleting blog';
      });
  },
  // add more reducers here as needed
});

// Export the action creator for addBlog
// export const { addBlog, deleteBlog, editBlog } = blogsSlice.actions;

// Export the reducer to be used in the store
export default blogsSlice.reducer;

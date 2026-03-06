import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type { IPost, INewPost, IPostsState } from "../../types/types";
import type { PayloadAction } from "@reduxjs/toolkit";

const API = "https://jsonplaceholder.typicode.com/posts";

// Fetch posts with pagination 
export const fetchPosts = createAsyncThunk<
  { data: IPost[]; totalCount: number },  
  { page: number; limit: number },         
  { rejectValue: string }                   
>(
  "posts/fetchPosts",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const resp = await fetch(`${API}?_page=${page}&_limit=${limit}`);
      if (!resp.ok) throw new Error("Failed to fetch posts");
      
      const totalCount = resp.headers.get("x-total-count");
      const data: IPost[] = await resp.json();
      
      return { data, totalCount: totalCount ? parseInt(totalCount) : 0 };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Add post 
export const addPost = createAsyncThunk<
  IPost,                                    // Return type
  INewPost,                                 // Argument type
  { rejectValue: string }                   // Reject value type
>("posts/addPost", async (newPost, { rejectWithValue }) => {
  try {
    const resp = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    });
    if (!resp.ok) throw new Error("Failed to add post");
    const data: IPost = await resp.json();
    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const initialState: IPostsState = {
  posts: [],
  loading: false,
  error: null,
  addingPost: false,
  currentPage: 1,
  totalPages: 1,
  limit: 10,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
      state.currentPage = 1; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.data;
        const totalPages = Math.ceil(action.payload.totalCount / state.limit);
        state.totalPages = totalPages || 1;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error.message ?? "Unknown error";
      })
      .addCase(addPost.pending, (state) => {
        state.addingPost = true;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.addingPost = false;
        state.posts.unshift(action.payload);
      })
      .addCase(addPost.rejected, (state, action) => {
        state.addingPost = false;
        state.error = action.payload ?? action.error.message ?? "Unknown error";
      });
  },
});

export const { setPage, setLimit } = postsSlice.actions;
export default postsSlice.reducer;
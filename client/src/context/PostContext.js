import { createContext, useReducer, useState } from "react";
import { postReducer } from "../reducer/postReducer";
import { apiUrl, DELETE_POST, FIND_POST, UPDATE_POST } from "./Constants";
import axios from "axios";
import { POSTS_LOADED_SUCCESS, POSTS_LOADED_FAIL, ADD_POST } from "./Constants";

export const PostContext = createContext();

// Get posts http://localhost:5000/api/posts

const PostContextProvider = ({ children }) => {
  //show add post modal
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  //show update post modal
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
  //Toast
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });
  //postState
  const [postState, dispatch] = useReducer(postReducer, {
    post: null,
    posts: [],
    postLoading: true,
  });
  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}posts`);
      if (response.data.success) {
        dispatch({
          type: POSTS_LOADED_SUCCESS,
          payload: response.data.posts,
        });
      }
    } catch (error) {
      dispatch({ type: POSTS_LOADED_FAIL });
    }
  };
  //add post
  const addPost = async (newPost) => {
    try {
      const response = await axios.post(`${apiUrl}posts`, newPost);
      if (response.data.success)
        dispatch({ type: ADD_POST, payload: response.data.post });
      return response.data;
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "server error" };
    }
  };
  // delete post

  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`${apiUrl}posts/${postId}`);
      if (response.data.success) {
        dispatch({ type: DELETE_POST, payload: postId });
      }
    } catch (error) {
      console.log(error);
    }
  };
  //Find post when user is updating post
  const findPost = (postId) => {
    const post = postState.posts.find((post) => post._id === postId);
    dispatch({
      type: FIND_POST,
      payload: post,
    });
  };

  //update post
  const updatePost = async (updatedPost) => {
    try {
      const response = await axios.put(
        `${apiUrl}posts/${updatedPost._id}`,
        updatedPost
      );
      if (response.data.success) {
        dispatch({ type: UPDATE_POST, payload: response.data.post });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "server error" };
    }
  };
  //postContextData
  const postContextData = {
    postState,
    getPosts,
    showAddPostModal,
    setShowAddPostModal,
    addPost,
    showToast,
    setShowToast,
    deletePost,
    updatePost,
    findPost,
    showUpdatePostModal,
    setShowUpdatePostModal,
  };
  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;

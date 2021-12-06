import React from "react";
import Post from "../components/post";

const AllBlogs = (props) => {
  // For each post in the array render a Post component
  return props.posts.map((post) => <Post post={post} key={post.id} />);
};

export default AllBlogs;
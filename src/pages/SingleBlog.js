import React from "react";
import { Link, useParams } from "react-router-dom";

// destructuring the props needed to get our post, including router prop match
const SingleBlog = ({posts, edit, deleteBlog}) => {
  console.log("we are in singleblog line 6", posts)
    const params = useParams()
    const id = parseInt(params.id); //get the id from url param
    const blog = posts.find((blog) => blog.id === id);
    console.log("this is singleblog we need", blog)
////////////////////
  // Styles
  ///////////////////
  const div = {
    textAlign: "center",
    border: "3px solid green",
    width: "80%",
    margin: "30px auto",
  };

  return (
    <div style={div}>
      <h1>{blog.title}</h1>
      <h2>{blog.body}</h2>
      <button onClick={() => deleteBlog(blog)}>Delete</button>
        <button onClick={() => edit(blog)}>Edit</button>
      <Link to="/">
        <button>Go Back</button>
      </Link>
    </div>
  );
};

export default SingleBlog;
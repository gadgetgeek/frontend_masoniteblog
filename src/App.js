import AllBlogs from "./pages/AllBlogs";
import SingleBlog from "./pages/SingleBlog";
import Form from "./pages/Form";


// Import React and hooks
import React, { useState, useEffect } from "react";

// Import Router 6 Component (Route -> Route, Switch -> Routes)
import {Route, Routes, Link, useNavigate} from "react-router-dom"

/////////////////////////
// Style Object
/////////////////////////
const h1 = {
  textAlign: "center",
  margin: "10px",
};

const button = {
  backgroundColor: "navy",
  display: "block",
  margin: "auto"
}

function App(props) {
 

  ///////////////
  // State & Other Variables
  ///////////////

  const navigate = useNavigate()
  
  // Our Api Url
  const url = "https://masoniteblog-ba-be.herokuapp.com/blog/";

  // State to Hold The List of Posts
  const [posts, setPosts] = useState([]);

  const nullBlog = {
    title: "",
    body: ""
  }

const [targetBlog, setTargetBlog] = useState(nullBlog)


  //////////////
  // Functions
  //////////////

// Function to get list of blog from API
const getBlog = async () => {
  const response = await fetch(url);
  const data = await response.json();
  setPosts(data);
};

// function to add blog
const addBlog = async (newBlog) => {
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newBlog)
  });

   //update the list of todos
   getBlog()
  }

   // to select a blog to edit
   const getTargetBlog = (blog) => {
    setTargetBlog(blog);
    navigate("/edit");
  };

  // update blog for our handlesubmit prop
  const updateBlog = async (blog) => {
    await fetch(url + blog.id, {
      method: "put",
       headers: {
         "Content-Type": "application/json",
      },
       body: JSON.stringify(blog),
     });
  
    //update our blog
    getBlog();
  };

  const deleteBlog = async (blog) => {
    await fetch(url + blog.id, {
      method: "delete"
    })

    getBlog()
    navigate("/")
  }

//////////////
// useEffects
//////////////
// useEffect to get list of blog when page loads
useEffect(() => {
  getBlog();
}, []);

  //////////////////////////
  // Returned JSX
  //////////////////////////

  return (
    <div className="App">
      <h1 style={h1}>My Blog Posts</h1>
      <Link to="/new"><button style={button}>Create Blog</button></Link>
      <Routes>
        <Route path="/" element={<AllBlogs posts={posts}/>}/>
        <Route path="/blog/:id" element={<SingleBlog 
        posts={posts} 
        edit={getTargetBlog}
        deleteBlog={deleteBlog}
        />} />
         <Route path="/new" element={<Form 
          initialBlog={nullBlog}
          handleSubmit={addBlog}
          buttonLabel="Create Blog"
        />} />
        <Route path="/edit" element={<Form
          initialBlog={targetBlog}
          handleSubmit={updateBlog}
          buttonLabel="Update Blog"
        />} />
      </Routes>
    </div>
  );
}

export default App;

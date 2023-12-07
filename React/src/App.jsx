import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "../components/post/Post";
import Modal from "../components/Modal/Modal";
import axios from "axios";

const App = () => {
  function addPost(post) {
    const newPost = {
      ...post,
      id: new Date().getMilliseconds(),
      userId: 1,
    };
    setPosts([...posts, newPost]);
  }

  const [input, setInput] = useState("");

  const [open, setOpen] = useState(false);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.data)
      .then((data) => setPosts(data))
      .catch((err) => setPosts([]));
  }, []);

  return (
    <div className="container">
      <input
        className="post-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Создать"
      />
      {posts.length ? (
        <div className="post-list">
          {posts.map((post) => (
            <Post key={post.id} data={post} />
          ))}
        </div>
      ) : (
        <h2>Постов нет</h2>
      )}

      <button className="post-add" onClick={() => setOpen(true)}>
        Добавить
      </button>
      <Modal open={open} addPost={addPost} close={() => setOpen(false)} />
    </div>
  );
};

export default App;

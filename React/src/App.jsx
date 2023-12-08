import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import Post from "../components/post/Post";
import Modal from "../components/Modal/Modal";
import axios from "axios";
import Paginator from "../components/Paginator/Paginator";

const PAGE_SIZE = 10;

const App = () => {
    function addPost(post) {
        const newPost = {
            ...post,
            id: new Date().getMilliseconds(),
            userId: 1,
        };
        setPosts([...posts, newPost]);
    }

    function updatePage(num) {
        setFilters({ ...filter, page: num });
    }

    const [filter, setFilters] = useState({
        searching: "",
        page: 1,
    });

    const [open, setOpen] = useState(false);

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios
            .get("https://jsonplaceholder.typicode.com/posts")
            .then((res) => res.data)
            .then((data) => setPosts(data))
            .catch((err) => setPosts([]));
    }, []);

    const filteredPosts = useMemo(() => {
        if (!posts.length) return [];

        const { searching } = filter;

        const result = posts.filter((post) =>
            post.title.toLowerCase().includes(searching.toLowerCase())
        );
        return result;
    }, [posts, filter]);

    const pagesCount = Math.ceil(filteredPosts.length / PAGE_SIZE);
    const pagesIndex = PAGE_SIZE * (filter.page - 1);

    return (
        <div className="container">
            <input
                className="post-input"
                value={filter.searching}
                onChange={(e) =>
                    setFilters({
                        searching: e.target.value,
                        page: 1,
                    })
                }
                placeholder="Поиск..."
            />
            {posts.length ? (
                <div className="post-list">
                    {filteredPosts.slice(pagesIndex, 10 + pagesIndex).map((post) => (
                        <Post key={post.id} data={post} />
                    ))}
                </div>
            ) : (
                <h2>Постов нет</h2>
            )}

            <button className="post-add" onClick={() => setOpen(true)}>
                Добавить
            </button>

            {pagesCount > 1 && (
                <Paginator
                    activePage={filter.page}
                    updatePage={updatePage}
                    pagesCount={Math.ceil(posts.length / PAGE_SIZE)}
                />
            )}

            <Modal open={open} addPost={addPost} close={() => setOpen(false)} />
        </div>
    );
};

export default App;

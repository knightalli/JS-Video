import React, { useState, useEffect, useMemo } from "react";
import "./PostsList.css";
import Post from "./components/post/Post";
import Modal from "./components/Modal/Modal";
import axios from "axios";
import Paginator from "../../components/Paginator/Paginator.jsx";
import PostSelect from "./components/PostSelect/PostSelect.jsx";

const PAGE_SIZE = 10;
const sortingOptions = [
    {
        name: "По заголовку",
        value: "title",
    },
    {
        name: "По содержимому",
        value: "body",
    },
];

const PostsList = () => {
    function addPost(post) {
        const newPost = {
            ...post,
            id: new Date().getMilliseconds(),
            userId: 1,
        };
        setPosts([...posts, newPost]);
    }

    function updateFilter(name, value) {
        setFilters({ ...filter, [name]: value });
    }

    const [filter, setFilters] = useState({
        searching: "",
        page: 1,
        sorting: "",
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

    const filteredSortesPosts = useMemo(() => {
        if (!posts.length) return [];

        const { searching, sorting } = filter;

        const result = posts.filter((post) =>
            post.title.toLowerCase().includes(searching.toLowerCase())
        );

        if (sorting) {
            result.sort((post1, post2) => post1[sorting].localeCompare(post2[sorting]));
        }

        return result;
    }, [posts, filter]);

    const pagesCount = Math.ceil(filteredSortesPosts.length / PAGE_SIZE);
    const pagesIndex = PAGE_SIZE * (filter.page - 1);

    return (
        <div className="container">
            <div className="post-header">
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
                <PostSelect
                    options={sortingOptions}
                    activeSorting={filter.sorting}
                    updateSorting={(value) => updateFilter("sorting", value)}
                />
            </div>

            {posts.length ? (
                <div className="post-list">
                    {filteredSortesPosts.slice(pagesIndex, 10 + pagesIndex).map((post) => (
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
                    updatePage={(button) => updateFilter("page", button)}
                    pagesCount={Math.ceil(posts.length / PAGE_SIZE)}
                />
            )}

            <Modal open={open} addPost={addPost} close={() => setOpen(false)} />
        </div>
    );
};

export default PostsList;

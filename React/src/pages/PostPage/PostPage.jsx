import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        axios
            .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then((res) => res.data)
            .then((data) => setPost(data))
            .catch((err) => console.error(err));
    }, [id]);

    if (!post) return <h3>Загрузка...</h3>;
    return (
        <div className="post">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <span>Автор под номером: {post.userId}</span>
        </div>
    );
};

export default PostPage;

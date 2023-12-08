import React from "react";
import styles from "./Post.module.css"
import { Link, useNavigate } from "react-router-dom";

const Post = (props) => {

  const {data} = props;

  const navigate = useNavigate();

  function goPage() {
    navigate(`/post/${data.id}`);
  }

  return (
    <div className={styles.post}>
      <Link to={`/post/${data.id}`} className={styles["post-title"]}>{data.title}</Link>
      <p>{data.body}</p>
      <div className={styles["post-buttons"]}>
        <button onClick={goPage} className={styles["post-open"]}>Перейти</button>
        <button className={styles["post-delete"]}>Удалить</button>
      </div>
    </div>
  );
};

export default Post;

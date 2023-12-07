import React from "react";
import styles from "./Post.module.css"

const Post = (props) => {

  const {data} = props;

  return (
    <div className={styles.post}>
      <h6 className={styles["post-title"]}>{data.title}</h6>
      <p>{data.body}</p>
      <div className={styles["post-buttons"]}>
        <button className={styles["post-open"]}>Перейти</button>
        <button className={styles["post-delete"]}>Удалить</button>
      </div>
    </div>
  );
};

export default Post;

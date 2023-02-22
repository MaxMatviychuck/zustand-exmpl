import { useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export const Post = ({
  post,
  updatePostLoading,
  deletePost,
  handleUpdatePost,
  handleChange,
}) => {
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);

  return (
    <div className="post">
      {updatePostLoading.loading && updatePostLoading.postId === post.id ? (
        <div className="item-loader">
          <h1>Loading...</h1>
        </div>
      ) : (
        <>
          <h3>{post.id}</h3>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
          <div className="post-settings">
            <DeleteIcon className="icon" onClick={() => deletePost(post.id)} />
            <EditIcon
              className="icon"
              onClick={() => setIsUpdateFormOpen((prevState) => !prevState)}
            />
          </div>
          {isUpdateFormOpen && (
            <form
              className="post-update-form"
              onSubmit={(e) => {
                handleUpdatePost(e, post.id, post.userId);
                setIsUpdateFormOpen(false);
              }}
            >
              <label className="post-update-form-label">
                Title:
                <textarea
                  type="text"
                  name="title"
                  defaultValue={post.title}
                  onChange={handleChange}
                  rows="10"
                  cols="50"
                />
              </label>
              <label className="post-update-form-label">
                Body:
                <textarea
                  type="text"
                  name="body"
                  defaultValue={post.body}
                  onChange={handleChange}
                  rows="10"
                  cols="50"
                />
              </label>
              <button type="submit">Save</button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

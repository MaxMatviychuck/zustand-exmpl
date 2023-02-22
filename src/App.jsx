import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";

import { useGetUsers } from "./queries/useGetUsers";
import { useUsersStore, usePostsStore } from "./stores";

import "./App.css";
import { Post } from "./Post";

const App = () => {
  const { data: fetchedUsers, isLoading: isUsersLoading } = useGetUsers();
  const users = useUsersStore((state) => state.users);

  const [posts, loading, getPosts, deletePost, updatePost, updatePostLoading] =
    usePostsStore(
      (state) => [
        state.posts,
        state.loading,
        state.getPosts,
        state.deletePost,
        state.updatePost,
        state.updatePostLoading,
      ],
      shallow
    );

  const [formFields, setFormFields] = useState({ title: "", body: "" });

  useEffect(() => {
    getPosts();
  }, []);

  // uncomment if needed
  //console.info("users FROM STORE", users);
  //console.info("fetchedUsers FROM QUERY", fetchedUsers);

  const handleChange = ({ target }) => {
    setFormFields({ ...formFields, [target.name]: target.value.trim() });
  };

  const handleUpdatePost = (e, postId, userId) => {
    e.preventDefault();
    updatePost(postId, userId, formFields);
  };

  return (
    <div className="App">
      <div>
        <h1>Data persistance from query to the store demo</h1>
        {isUsersLoading ? (
          <h1>Loading...</h1>
        ) : (
          users?.map((user) => <p key={user.id}>{user.name}</p>)
        )}
      </div>
      <div>
        <h1>Store Usage Demo</h1>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          posts?.map((post) => (
            <Post
              key={post.id}
              post={post}
              updatePostLoading={updatePostLoading}
              deletePost={deletePost}
              handleUpdatePost={handleUpdatePost}
              handleChange={handleChange}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default App;

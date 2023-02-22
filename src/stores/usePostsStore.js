import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// import { immer } from 'zustand/middleware/immer'

export const usePostsStore = create(
  devtools(
    persist(
      (set, get) => ({
        posts: [],
        loading: false,
        updatePostLoading: {
          id: null,
          loading: false,
        },
        error: null,
        getPosts: () => {
          set({ loading: true }, false, "posts/loading");
          fetch("https://jsonplaceholder.typicode.com/posts?userId=1")
            .then((response) => response.json())
            .then((json) =>
              set(
                { posts: [...json], loading: false },
                false,
                "posts/get_posts"
              )
            )
            .catch((error) => {
              set({ loading: false, error });
              throw error;
            });
        },
        deletePost: (postId) => {
          set({ loading: true }, false, "posts/loading");
          fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            method: "DELETE",
          })
            .then((response) => {
              if (response.status === 200) {
                set(
                  () => {
                    return {
                      posts: get().posts.filter((post) => postId !== post.id),
                      loading: false,
                    };
                  },
                  false,
                  "posts/delete_posts"
                );
              }
            })
            .catch((error) => {
              set({ loading: false, error });
              throw error;
            });
        },
        updatePost: (postId, userId, fields) => {
          set(
            {
              updatePostLoading: {
                postId,
                loading: true,
              },
            },
            false,
            "posts/loading"
          );
          fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            method: "PUT",
            body: JSON.stringify({
              id: postId,
              title: fields.title,
              body: fields.body,
              userId,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((response) => response.json())
            .then((json) =>
              set(
                () => {
                  const index = get().posts.findIndex(
                    (post) => post.id === postId
                  );
                  const postsCopy = get().posts;
                  postsCopy[index] = json;
                  return {
                    posts: postsCopy,
                    updatePostLoading: {
                      postId,
                      loading: false,
                    },
                  };
                },
                false,
                "posts/update_posts"
              )
            )
            .catch((error) => {
              set(
                {
                  updatePostLoading: {
                    id: null,
                    loading: false,
                  },
                  error,
                },
                false,
                "posts/loading"
              );
              throw error;
            });
        },
      }),
      {
        name: "users-storage", // name of the item in the storage (must be unique)
        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(([key]) => ["posts"].includes(key))
          ),
        //storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      }
    ),
    { serialize: true }
  )
);

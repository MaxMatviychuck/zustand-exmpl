import { useQuery } from "react-query";
import { shallow } from "zustand/shallow";

import { useUsersStore } from "../stores/useUsersStore";

export const usersQueryKey = "users";

const fetchUsers = () =>
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => {
      console.error(error);
      throw error;
    });

export const useGetUsers = () => {
  const [setUsers] = useUsersStore((state) => [state.setUsers], shallow);

  return useQuery(usersQueryKey, () => fetchUsers(), {
    onSuccess: (data) => setUsers(data),
  });
};

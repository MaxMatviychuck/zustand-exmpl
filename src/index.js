import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider, QueryCache } from "react-query";

import "./index.css";
import App from "./App";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => console.error(error.message),
  }),
  defaultOptions: {
    mutations: {
      retry: 1,
    },
    queries: {
      notifyOnChangeProps: "tracked",
      staleTime: 1000 * 60 * 10, // cache stale time 10 minutes
      retry: 2,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

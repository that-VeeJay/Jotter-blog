import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import { useContext } from "react";
import { AppContext } from "./Context/AppContext";
import Create from "./Pages/Posts/Create";
import Show from "./Pages/Posts/Show";
import Update from "./Pages/Posts/Update";

export default function App() {
  const { user } = useContext(AppContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/register",
          element: user ? <Home /> : <Register />,
        },
        {
          path: "/login",
          element: user ? <Home /> : <Login />,
        },
        {
          path: "/create",
          element: user ? <Create /> : <Login />,
        },
        {
          path: "/posts/:id",
          element: <Show />,
        },
        {
          path: "/posts/update/:id",
          element: user ? <Update /> : <Login />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

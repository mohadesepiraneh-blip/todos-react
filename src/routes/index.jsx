import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Todos from "./Todos";
import About from "./Todos/About";
import Root from "./Root";
import SingleTodo from "./Todos/SingleTodo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/todos",
        element: <Todos />,
      },
      {
        path: "/todos/:todoId",
        element: <SingleTodo />,
      },
      {
        path: "/about",
        element: <About />,
      }
    ]
  },
]);

export default router;

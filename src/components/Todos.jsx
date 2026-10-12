import { useEffect, useReducer, useRef, useState } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";
import NewTodoInput from "./NewTodoInput";
import axios from "axios";
import { toast } from "react-toastify";
import todoReducer from "../reducer/todoReducer";
import { TodosContext } from "./context/TodosContext";

export default function Todos() {
  //   const [todos, setTodos] = useState([]);
  const [todos, todoDispatcher] = useReducer(todoReducer, []);

  const myref = useRef("Hello");

  const addNewTodoHandler = async (todoTitle) => {
    myref.current = "Mohi";

    let newTodo = {
      title: todoTitle,
      status: false,
    };

    try {
      let res = await axios.post(
        "https://6aba686d5b549d818d6261f5.mockapi.io/todos",
        newTodo,
      );

      let todoData = res.data;

      //   setTodos([...todos, todoData]);

      todoDispatcher({
        type: "add",
        id: todoData?.id,
        title: todoData?.title,
      });

      toast.success("todo created");
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to create todo");
    }
  };



  const getTodosFromApi = async () => {
    try {
      let res = await axios.get(
        "https://6aba686d5b549d818d6261f5.mockapi.io/todos",
      );

      let todos = res.data;

      todoDispatcher({
        type: "initial-todos",
        todos,
      });
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to get todos");
    }
  };

  useEffect(() => {
    getTodosFromApi();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3 bg-white">
        <div className="flex items-center mb-6">
          <h1 className="mr-6 text-4xl font-bold text-purple-600">
            TO DO APP : {myref.current}
          </h1>
        </div>

        <NewTodoInput addTodo={addNewTodoHandler} />

        <TodosContext.Provider value={{
            todos,
            todoDispatcher
        }}>
        <TodoList />
        </TodosContext.Provider>
      </div>
    </div>
  );
}

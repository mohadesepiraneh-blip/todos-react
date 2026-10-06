import { useEffect, useRef, useState } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";
import NewTodoInput from "./NewTodoInput";
import axios from "axios";
import { toast } from "react-toastify";

export default function Todos() {
  const [todos, setTodos] = useState([]);
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
        newTodo
      );

      let todoData = res.data;

      setTodos([...todos, todoData]);

      toast.success("todo created");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to create todo"
      );
    }
  };

  const deleteTodoHandler = async (todo) => {
    try {
      await axios.delete(
        `https://6aba686d5b549d818d6261f5.mockapi.io/todos/${todo?.id}`
      );

      let newTodos = todos.filter((todoItem) => {
        return todo.id != todoItem.id;
      });

      setTodos(newTodos);

      toast.success("todo deleted");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to delete todo"
      );
    }
  };

  const toggleTodoStatusHandler = async (todo) => {
    try {
      let res = await axios.put(
        `https://6aba686d5b549d818d6261f5.mockapi.io/todos/${todo.id}`,
        {
          title: todo.title,
          status: !todo.status,
        }
      );

      let updatedTodo = res.data;

      let newTodos = todos.map((todoItem) => {
        if (todo.id === todoItem.id) {
          return updatedTodo;
        }

        return todoItem;
      });

      setTodos(newTodos);

      toast.success("todo status updated");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to update todo status"
      );
    }
  };

  const editTodoTitleHandler = async (todo, newTitleValue) => {
    try {
      let res = await axios.put(
        `https://6aba686d5b549d818d6261f5.mockapi.io/todos/${todo.id}`,
        {
          title: newTitleValue,
          status: todo.status,
        }
      );

      let updatedTodo = res.data;

      let newTodos = todos.map((todoItem) => {
        if (todo.id === todoItem.id) {
          return updatedTodo;
        }

        return todoItem;
      });

      setTodos(newTodos);

      toast.success("todo title updated");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to update todo title"
      );
    }
  };

  const getTodosFromApi = async () => {
    try {
      let res = await axios.get(
        "https://6aba686d5b549d818d6261f5.mockapi.io/todos"
      );

      let todos = res.data;

      setTodos(todos);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to get todos"
      );
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

        <TodoList
          todos={todos}
          deleteTodo={deleteTodoHandler}
          toggleTodoStatus={toggleTodoStatusHandler}
          editTodoTitle={editTodoTitleHandler}
        />
      </div>
    </div>
  );
}

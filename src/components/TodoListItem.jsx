import { toast } from "react-toastify";
import DeleteIcon from "./icons/DeleteIcon";
import EditIcon from "./icons/EditIcon";
import { useContext, useEffect, useState } from "react";
import { TodosContext } from "./context/TodosContext";
import axios from "axios";
import { Link } from "react-router-dom";

export default function TodoListItem({ todo }) {
  const [editMode, setEditMode] = useState(false);
  const { todoDispatcher } = useContext(TodosContext);

  // Edit todo title
  const editTodoHandler = (event) => {
    if (event.key === "Enter") {
      const newTitle = event.target.value.trim();

      if (!newTitle) {
        toast.error("Todo title cannot be empty");
        return;
      }

      editTodoTitleHandler(todo, newTitle);
      setEditMode(false);
    }
  };

  useEffect(() => {
    console.log(`the component created! ${todo.title}`);

    return () => {
      console.log(`the component deleted! ${todo.title}`);
    };
  }, []);

  // Delete todo
  const deleteTodoHandler = async (todo) => {
    try {
      await axios.delete(
        `https://6aba686d5b549d818d6261f5.mockapi.io/todos/${todo.id}`,
      );

      todoDispatcher({
        type: "delete",
        id: todo.id,
      });

      toast.success("todo deleted");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to delete todo");
    }
  };

  // Toggle todo status
  const toggleTodoStatusHandler = async (todo) => {
    try {
      const res = await axios.put(
        `https://6aba686d5b549d818d6261f5.mockapi.io/todos/${todo.id}`,
        {
          title: todo.title,
          status: !todo.status,
        },
      );

      todoDispatcher({
        type: "toggle-status",
        todo: res.data,
      });

      toast.success("todo status updated");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to update todo status",
      );
    }
  };

  // Edit todo title
  const editTodoTitleHandler = async (todo, newTitleValue) => {
    try {
      const res = await axios.put(
        `https://6aba686d5b549d818d6261f5.mockapi.io/todos/${todo.id}`,
        {
          title: newTitleValue,
          status: todo.status,
        },
      );

      todoDispatcher({
        type: "edit-title",
        id: todo.id,
        newTitle: res.data.title,
      });

      toast.success("todo title updated");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to update todo title",
      );
    }
  };

  return (
    <li className="relative flex items-center justify-between px-2 py-6 border-b">
      {editMode ? (
        <div className="w-full flex items-center">
          <input
            type="text"
            defaultValue={todo?.title}
            onKeyDown={editTodoHandler}
            className="w-full px-4 py-2 border border-gray-200 rounded"
          />

          <DeleteIcon className="ml-2" onClick={() => setEditMode(false)} />
        </div>
      ) : (
        <div className="flex items-center">
          <div>
            <input
              type="checkbox"
              checked={todo?.status}
              onChange={() => toggleTodoStatusHandler(todo)}
            />

            <Link to={`/todos/${todo.id}`}>
              <p
                className={`inline-block mt-1 ml-2 text-gray-600 ${
                  todo?.status ? "line-through" : ""
                }`}
              >
                {todo?.title}
              </p>
            </Link>
          </div>

          <button
            type="button"
            className="absolute right-0 flex items-center space-x-1"
          >
            <EditIcon onClick={() => setEditMode(true)} />

            <DeleteIcon onClick={() => deleteTodoHandler(todo)} />
          </button>
        </div>
      )}
    </li>
  );
}

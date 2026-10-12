import { useContext } from "react";
import TodoListItem from "./TodoListItem";
import { TodosContext } from "./context/TodosContext";

export default function TodoList() {
  const { todos } = useContext(TodosContext);

  return (
    <ul className="list-reset">
      {todos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

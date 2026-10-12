export default function todoReducer(todos, action) {
  switch (action?.type) {
    case "initial-todos":
      return action?.todos;

    case "add":
      return [
        ...todos,
        {
          id: action?.id,
          title: action?.title,
          status: false,
        },
      ];
    case "delete":
      return todos.filter((todoItem) => {
        return action?.id != todoItem.id;
      });

    case "toggle-status":
      return todos.map((todoItem) => {
        if (action.todo.id === todoItem.id) {
          return action.todo;
        }

        return todoItem;
      });

    case "edit-title":
      return todos.map((todoItem) => {
        if (action.id === todoItem.id) {
          return {
            ...todoItem,
            title: action.newTitle,
          };
        }

        return todoItem;
      });
    default:
      return todos;
  }
}

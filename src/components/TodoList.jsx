import TodoListItem from "./TodoListItem";


export default function TodoList( { todos , deleteTodo , toggleTodoStatus , editTodoTitle }) {


    return(

         <ul className="list-reset">
            { todos.map((todos , index) => <TodoListItem key={index} todo={todos} deleteTodo={deleteTodo} toggleTodoStatus={toggleTodoStatus} editTodoTitle={editTodoTitle} /> )}
                </ul>
    )

}

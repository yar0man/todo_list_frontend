import { Todos } from "@/types/todos";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todos[],
  onTodosChange: React.Dispatch<React.SetStateAction<Todos[]>>,
}

const TodoList: React.FC<TodoListProps> = ({ todos, onTodosChange }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Todos</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onTodosChange={onTodosChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
import { Todos } from "@/types/todos";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import classNames from 'classnames';
import Modal from "./Modal";
import { deleteTodo, updateTodo } from "../api/todos";

interface TodoProps {
  todo: Todos,
  onTodosChange: React.Dispatch<React.SetStateAction<Todos[]>>,
};

const TodoItem: React.FC<TodoProps> = ({ todo, onTodosChange }) => {
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);

  const removeTodo = (todoId: number) => {
    deleteTodo(todoId)
      .then(() => onTodosChange(currentTodos => currentTodos
        .filter(curTodo => +curTodo.id !== todoId)))
    .catch(() => {
      throw new Error('Unable to delete a todo');
    })
  };

  const handleUpdate = (data: Partial<Todos>) => {

    updateTodo(+todo.id, data)
      .then((newTodo) => {
        onTodosChange(prevState => {
          return prevState.map(todoItem => {
            if (todoItem.id === newTodo.id) {
              return newTodo;
            }

            return todoItem;
          });
        });
      })
      .catch(() => {
        throw new Error('Unable to update a todo');
      })
  };

  const handleUpdateStatus = () => {
    handleUpdate({ completed: !todo.completed });
  };

  return (
    <tr key={todo.id}>
      <td
        className={classNames(
          'w-full',
          'flex gap-5',
          'items-center',
          'font-bold',
          {
            'line-through text-green-500': todo.completed
          })}>
        <label className="cursor-pointer label">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleUpdateStatus}
            className={classNames('checkbox', {
              'checkbox-success': todo.completed
            })}
          />
        </label>
        {todo.title}
      </td>
      <td className="text-4md font-bold">
        {todo.priority}
      </td>
      <td>
        <FiTrash2
          cursor="pointer"
          className="text-red-500 ml-auto"
          size={25}
          onClick={() => setOpenModalDeleted(true)}
        />
        <Modal
          modalOpen={openModalDeleted}
          setModalOpen={setOpenModalDeleted}
        >
          <h3 className='text-lg'>
            Are you sure, you want to delete this task?
          </h3>
          <div className='modal-action'>
            <button onClick={() => removeTodo(+todo.id)} className='btn'>
              Yes
            </button>
            <button onClick={() => setOpenModalDeleted(false)} className='btn'>
              No
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default TodoItem;

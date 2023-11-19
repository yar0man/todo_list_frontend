
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { Todos } from "@/types/todos";
import { PRIORITIES } from "../constants/priorityOptions";

interface AddTodoProps {
  handleSubmitNewTodo: (e: React.FormEvent<HTMLFormElement>) => void,
  title: string,
  onTitleChange: (title: string) => void,
  priority: number,
  onPriorityChange: (priority: number) => void,
  modalOpen: boolean,
  onModalOpenChange: (modalOpen: boolean) => void,
};

const AddTodo: React.FC<AddTodoProps> = ({
  handleSubmitNewTodo,
  title,
  onTitleChange,
  priority,
  onPriorityChange,
  modalOpen,
  onModalOpenChange,
}) => {

  return (
    <div>
      <button
        onClick={() => onModalOpenChange(true)}
        className="btn btn-primary w-full"
      >
        Add new todo
        <AiOutlinePlus className="ml-2" size={18} />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={onModalOpenChange}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className='font-bold text-lg'>Add new Todo</h3>

          <div className="modal-action">
            <input
              required
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />

            <select
              value={priority}
              onChange={(e) => onPriorityChange(+e.target.value)}
              className="select select-bordered max-w-xs"
            >
              <option disabled value="0">priority</option>
              {PRIORITIES.map((priority) => (
                <option key={priority}>{priority}</option>
              ))}
            </select>

            <button
              type="submit"
              className="btn"
              disabled={priority === 0}
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTodo;

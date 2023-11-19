import { FilterStatus } from "@/types/FilterStatus";
import classNames from 'classnames';

interface TodoFilerProps {
  selectedFilter: string,
  onSelectedFilter: (value: FilterStatus) => void,
  query: string,
  onQueryChange: (value: string) => void,
};

const TodoFilter: React.FC<TodoFilerProps> = ({ 
  selectedFilter, 
  onSelectedFilter,
  query,
  onQueryChange, 
}) => {
  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    onQueryChange(event.target.value);
  }

  return (
    <div className="navbar bg-base-100 border-2 rounded-box justify-between">
      <div className="tabs tabs-bordered">
        <a
          href="#/"
          onClick={() => onSelectedFilter(FilterStatus.All)}
          className={classNames('tab', 'text-xl', {
            'tab-active': selectedFilter === FilterStatus.All,
          })}
        >
          All
        </a>

        <a
          href="#/active"
          onClick={() => onSelectedFilter(FilterStatus.Active)}
          className={classNames('tab', 'text-xl', {
            'tab-active': selectedFilter === FilterStatus.Active,
          })}
        >
          Undone
        </a>

        <a
          href="#/completed"
          onClick={() => onSelectedFilter(FilterStatus.Completed)}
          className={classNames('tab', 'text-xl', {
            'tab-active': selectedFilter === FilterStatus.Completed,
          })}
        >
          Done
        </a>
      </div>

      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search todo"
            className="input input-bordered w-24 lg:w-auto" 
            value={query}
            onChange={handleQueryChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoFilter;

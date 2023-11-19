import { SortType } from "@/types/SortType";
import classNames from 'classnames';

interface SortMenuProps {
  sortBy: string,
  onSortByChange: (val: SortType) => void,
};

const SortMenu: React.FC<SortMenuProps> = ({ sortBy, onSortByChange }) => {
  return (
    <div className="flex gap-5 items-center font-bold">
    <h3>Sort by:</h3>

    <ul 
      className="text-center menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box"
    >
      <li>
        <a
          className={classNames({
            'active': sortBy === SortType.Default
          })}
          onClick={() => onSortByChange(SortType.Default)}
        >
          Default
        </a>
      </li>
      <li>
        <a
          className={classNames({
            'active': sortBy === SortType.HighPriority
          })}
          onClick={() => onSortByChange(SortType.HighPriority)}>
          High priority
        </a>
      </li>
      <li>
        <a
          className={classNames({
            'active': sortBy === SortType.LowPriority
          })}
          onClick={() => onSortByChange(SortType.LowPriority)}
        >
          Low priority
        </a>
      </li>
    </ul>
  </div>
  );
};

export default SortMenu;
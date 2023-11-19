import { FilterStatus } from "@/types/FilterStatus";
import { SortType } from "@/types/SortType";
import { Todos } from "@/types/todos";

export const getFilteredTodos = (
  todos: Todos[],
  selectedFilter: string,
  query: string,
  sortBy: string,
) => {
  let todosCopy = [...todos];

  if (query) {
    const normalizedQuery = query.toLowerCase().trim();

    todosCopy = todosCopy.filter(({ title }) => (
      title.toLowerCase().includes(normalizedQuery)
    ));
  }

  if (selectedFilter) {
    todosCopy = todosCopy.filter(({ completed }) => {
      switch (selectedFilter) {
        case FilterStatus.Active:
          return !completed;
        case FilterStatus.Completed:
          return completed;
        default:
          return todosCopy;
      }
    });
  }

  if (sortBy) {
    todosCopy = todosCopy.sort((todo1, todo2) => {
      switch (sortBy) {
        case SortType.HighPriority:
          return todo1.priority - todo2.priority;

        case SortType.LowPriority:
          return todo2.priority - todo1.priority;;

        default:
          return 0;
      }
    });
  }

  return todosCopy;
};
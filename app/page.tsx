"use client";

import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { Todos } from "@/types/todos";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getFilteredTodos } from "./utils/filterTodos";
import { FilterStatus } from "@/types/FilterStatus";
import TodoFilter from "./components/TodoFilter";
import { SortType } from "@/types/SortType";
import SortMenu from "./components/SortMenu";
import { addTodo, getTodos } from "./api/todos";
import Loader from "./components/Loader";

export default function Home() {
  const [selectedFilter, setSelectedFilter] 
  = useState<FilterStatus>(FilterStatus.All);
  const [sortBy, setSortBy] = useState<SortType>(SortType.Default);
  const [todos, setTodos] = useState<Todos[]>([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => {
        throw new Error('unadle to load todos')
      })
      .finally(() => setIsLoading(false))
  }, []);

  const filteredTodos = useMemo(() => {
    return getFilteredTodos(todos, selectedFilter, query, sortBy);
  }, [todos, selectedFilter, query, sortBy]);
  
  const handleSubmitNewTodo = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      addTodo({
        title,
        priority,
        completed: false,
      })
        .then((newTodo) => {
          setTodos((currentTodos) => [...currentTodos, newTodo]);
        })
        .catch(() => {
          throw new Error('Unable to add a todo');
        });
  
      setTitle('');
      setPriority(0);
      setModalOpen(false);
    },
    [title, priority, setTodos, setTitle, setPriority, setModalOpen]
  );
  

  return (
    <main className="max-w-2xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Todo list App</h1>

        {todos.length > 0 && (
          <TodoFilter
            selectedFilter={selectedFilter}
            onSelectedFilter={setSelectedFilter}
            query={query}
            onQueryChange={setQuery}
          />
        )}

        <AddTodo
          handleSubmitNewTodo={handleSubmitNewTodo}
          title={title}
          onTitleChange={setTitle}
          priority={priority}
          onPriorityChange={setPriority}
          modalOpen={modalOpen}
          onModalOpenChange={setModalOpen}
        />
      </div>

      {isLoading && (
        <Loader />
      )}

      {filteredTodos.length > 0 && (
        <TodoList
          todos={filteredTodos}
          onTodosChange={setTodos}
        />
      )}

      {todos.length > 0 && (
        <SortMenu
          sortBy={sortBy}
          onSortByChange={setSortBy}
        />
      )}
    </main>
  )
}

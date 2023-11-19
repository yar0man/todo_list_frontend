import { Todos } from '@/types/todos';
import { client } from './fetchClient';

export const getTodos = () => {
  return client.get<Todos[]>('/todos');
};

export const addTodo = ({ title, priority }: Omit<Todos, 'id'>) => {
  return client.post<Todos>('/todos', { title, priority });
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const updateTodo = (todoId: number, data: Partial<Todos>) => {
  return client.patch<Todos>(`/todos/${todoId}`, data);
};

import TodoListItem from 'components/TodoListItem';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeStatusTodo,
  deleteTodo,
  getTodos,
} from '../../reducers/todosSlice';
import './styles.css';

const TodoList = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getTodos());
    // falta cargar informacion en el componente
  }, [dispatch]);

  const handleDelete = (todoId) => {
    // Fix an ability to delete task
    dispatch(deleteTodo(todoId));
  };

  const toggleCheck = (id, event) => {
    // Fix an ability to toggle task

    const checked = event.target.checked;

    dispatch(changeStatusTodo({ id, checked }));
  };

  return (
    <div className='todo-list'>
      <span className='todo-list-title'>Things to do:</span>

      {todos.every((todo) => todo.checked === true) ? (
        <div className='no-todos'>
          Looks like you&apos;re absolutely free today!
        </div>
      ) : (
        <div className='todo-list-content'>
          {todos.map((todo, ix) => (
            <TodoListItem
              onCheck={(isChecked) => toggleCheck(todo.id, isChecked)}
              checked={todo.checked}
              onDelete={() => handleDelete(todo.id)}
              label={todo.label}
              key={ix}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;

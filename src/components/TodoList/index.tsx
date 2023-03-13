import TodoListItem from 'components/TodoListItem';
import { Key, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import {
  changeStatusTodo,
  deleteTodo,
  getTodos,
} from '../../reducers/todosSlice';
import './styles.css';
import { TodoStateType } from '../../store/index';

const TodoList = () => {
  const dispatch = useAppDispatch();
  const { todos } = useSelector((state) => state as TodoStateType);
  useEffect(() => {
    dispatch(getTodos());
    // falta cargar informacion en el componente
  }, [dispatch]);

  const handleDelete = (todoId: string) => {
    // Fix an ability to delete task
    dispatch(deleteTodo(todoId));
  };

  const toggleCheck = (id: string, event: { target: { checked: any } }) => {
    // Fix an ability to toggle task

    const checked = event.target.checked;

    dispatch(changeStatusTodo({ id, checked }));
  };

  return (
    <div className='todo-list'>
      <span className='todo-list-title'>Things to do:</span>

      {todos.every((todo: { checked: boolean }) => todo.checked === true) ? (
        <div className='no-todos'>
          Looks like you&apos;re absolutely free today!
        </div>
      ) : (
        <div className='todo-list-content'>
          {todos.map(
            (todo: { id: string; checked: any; label: any }, ix: Key) => (
              <TodoListItem
                onCheck={(isChecked: any) => toggleCheck(todo.id, isChecked)}
                checked={todo.checked}
                onDelete={() => handleDelete(todo.id)}
                label={todo.label}
                key={ix}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default TodoList;

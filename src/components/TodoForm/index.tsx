import { useState } from 'react';
import './styles.css';
import { createTodo } from '../../reducers/todosSlice';
import { useAppDispatch } from '../../store/index';

const TodoForm = () => {
  const dispatch = useAppDispatch();
  const [label, setLabel] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo = {
      label,
      checked: false,
    };

    setLabel('');

    dispatch(createTodo(newTodo));
  };
  return (
    <form onSubmit={handleSubmit} className='form-imput-container'>
      <input
        type='text'
        id='new-todo'
        placeholder='ingrese un nuevo todo'
        value={label}
        onChange={handleChange}
        autoComplete='false'
      />
      <button type='submit' disabled={label.length > 0 ? false : true}>
        Add To Do
      </button>
    </form>
  );
};

export default TodoForm;

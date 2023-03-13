import { ChangeEventHandler, MouseEventHandler } from 'react';
import './styles.css';

const TodoListItem = ({
  onCheck,
  checked,
  onDelete,
  label,
}: TodoListParamsTypes) => (
  <div className='todo-list-item'>
    <div
      tabIndex={0}
      role='checkbox'
      aria-checked
      className='todo-list-item-content'
    >
      <input
        tabIndex={-1}
        type='checkbox'
        checked={checked}
        onChange={onCheck}
      />
      <span className={checked ? 'todo-list-item-checked' : ''}>{label}</span>
    </div>
    <button type='button' className='todo-list-item-delete' onClick={onDelete}>
      x
    </button>
  </div>
);

export default TodoListItem;

type TodoListParamsTypes = {
  onCheck: ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
  onDelete: MouseEventHandler<HTMLButtonElement>;
  label: string;
};

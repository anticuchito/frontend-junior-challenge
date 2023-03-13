import React from 'react';
import { useSelector } from 'react-redux';
import './styles.css';
import { TodoStateType } from '../../store/index';

const TodoResults = () => {
  // Fix an ability to calculate completed tasks
  const { countDone } = useSelector((state) => state as TodoStateType);

  return <div className='todo-results'>Done: {countDone}</div>;
};

export default TodoResults;

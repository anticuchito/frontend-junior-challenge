import React from 'react';
import TodoList from './components/TodoList';
import TodoResults from './components/TodoResults';
import './App.css';
import TodoForm from 'components/TodoForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='root'>
      <ToastContainer />
      <TodoList />
      <TodoResults />
      <TodoForm />
    </div>
  );
};

export default App;

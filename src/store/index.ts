import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import todoReducer from 'reducers/todosSlice';

const appStore = configureStore({
  reducer: todoReducer,
});

export interface TodoType {
  id: string;
  label: string;
  checked: boolean;
}
export interface TodoStateType {
  todos: TodoType[];
  countDone: number;
  loading: boolean;
}

export type appDispatchType = typeof appStore.dispatch;
export type StateType = typeof appStore;

export const useAppDispatch = () => useDispatch<appDispatchType>();

export default appStore;

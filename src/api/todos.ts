import axios from 'axios';
import { FecthedDataType } from '../types/testType';

const getTodos = async () => {
  const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/todos`);
  console.log(res);
  return res.data;
};

const addTodo = async (addTodo: FecthedDataType) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/todos`, addTodo);
};

const deleteTodo = async (id: string) => {
  await axios.delete(`${process.env.REACT_APP_SERVER_URL}/todos/${id}`);
};

const switchTodo = async (item: FecthedDataType) => {
  await axios.patch(`${process.env.REACT_APP_SERVER_URL}/todos/${item.id}`, {
    isDone: !item.isDone,
  });
};
export { getTodos, addTodo, deleteTodo, switchTodo };

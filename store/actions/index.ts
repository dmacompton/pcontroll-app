import axios from 'axios';
const URL = `https://jsonplaceholder.typicode.com`;

export function getTodoTitle() {
  const payload = axios.get(`${URL}/todos/1`).then(resp => resp.data);

  return {
    type: 'GET_TODO_TITLE',
    payload
  };
}

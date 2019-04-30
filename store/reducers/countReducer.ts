import { iAction } from '../../types';

const countReducer = (state = {}, action: iAction) => {
  switch (action.type) {
    case 'GET_TODO_TITLE':
      console.log('todo', action.payload);
      return {
        title: action.payload.title
      };

    default:
      return state;
  }
};

export default countReducer;

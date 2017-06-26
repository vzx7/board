import { ADD_TASK, DELETE_TASK, EDIT_TASK, DND_TASK } from '../actions';

const taskReducer = (state = {} , action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        id: action.id,
        task: action.task,
        status: action.status
      };

    case EDIT_TASK:
      if (state.id === action.id) {
        return Object.assign({}, state, {
          task: action.task
        });
      }  else return state;

    case DND_TASK:
      if (state.id === action.id) {
        return Object.assign({}, state, {
          status: action.status
        });
      }  else return state;

    default:
      break;
  }
};

export default (state = [] , action) => {
  switch (action.type) {
    case ADD_TASK:
      return [...state, taskReducer(undefined, action)];

    case EDIT_TASK:
      return state.map(task => taskReducer(task, action));

    case DELETE_TASK:
      let index = state.findIndex(task => task.id === action.id);
      return [
        ...state.slice(0, index),
        ...state.slice(++index)
      ];

    case DND_TASK:
      return state.map(task => taskReducer(task, action));

    default:
      return state;
  }
};

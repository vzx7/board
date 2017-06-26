export const ADD_TASK = 'SAVE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const DND_TASK = 'DND_TASK';

export const addTask = (task, count) => {
  return {
    type: ADD_TASK,
    id: ++count,
    task,
    status: -1
  };
};

export const deleteTask = id => {
  return {
    type: DELETE_TASK,
  id};
};

export const editTask = (task, id) => {
  return {
    type: EDIT_TASK,
    id,
  task};
};

export const dndTask = (status, id) => {
  return {
    type: DND_TASK,
    id,
  status};
};

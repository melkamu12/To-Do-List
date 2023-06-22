import { ToDoList, storeTasksToLocalStorage } from './todo.js';

function updateStatus(index, isChecked) {
  if (typeof index === 'undefined') {
    throw new Error('Item index is required.');
  }
  const itemToChange = ToDoList.find((item) => item.index === index);
  if (!itemToChange) {
    throw new Error(`Item with index ${index} not found.`);
  }
  itemToChange.completed = isChecked;
  storeTasksToLocalStorage();
}

export default updateStatus;

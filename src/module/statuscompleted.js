import { ToDoList, storeTasksToLocalStorage } from './todo.js';

function updateStatus(index, isChecked) {
  const itemToChange = ToDoList.find((item) => item.index === index);
  if (itemToChange) {
    itemToChange.completed = isChecked;
    storeTasksToLocalStorage();
  }
}
export default updateStatus;

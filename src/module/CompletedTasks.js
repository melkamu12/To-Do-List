import { ToDoList, storeTasksToLocalStorage } from "./todo.js";

const RemoveCompletedTasks = () => {
  const filteredTasks = ToDoList.filter((task) => !task.completed);
  ToDoList.length = 0;
  ToDoList.push(...filteredTasks);
  storeTasksToLocalStorage(ToDoList);
};
export default RemoveCompletedTasks;

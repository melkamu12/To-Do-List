// dragAndDrop.js

import {
  ToDoList,
  storeTasksToLocalStorage,
  sortToDoListTasks,
} from "./todo.js";

const dragStart = (event, index) => {
  event.dataTransfer.setData("text/plain", index);
  event.dataTransfer.effectAllowed = "move";
};

const dragOver = (event) => {
  event.preventDefault(); // Prevent default behavior to enable drop
};

const drop = (event, targetIndex) => {
  event.preventDefault();
  const sourceIndex = parseInt(event.dataTransfer.getData("text/plain"), 10);
  targetIndex = parseInt(targetIndex, 10); // Parse targetIndex as an integer

  if (sourceIndex !== targetIndex) {
    const [draggedTask] = ToDoList.splice(sourceIndex - 1, 1);
    ToDoList.splice(targetIndex, 0, draggedTask);
    sortToDoListTasks();
    storeTasksToLocalStorage();

    // Dispatch custom event to notify index.js to update the display
    const updateDisplayEvent = new CustomEvent("updateDisplay");
    document.dispatchEvent(updateDisplayEvent);
  }
};

export { dragStart, dragOver, drop };

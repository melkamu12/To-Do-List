const ToDoList = JSON.parse(localStorage.getItem('ToDoList')) || [];
const todoListElement = document.getElementById('todoList');
const updateIndexValues = () => {
  ToDoList.forEach((item, index) => {
    item.index = index + 1;
  });
};

const storeTasksToLocalStorage = () => {
  localStorage.setItem('ToDoList', JSON.stringify(ToDoList));
};
const retrieveTasksFromLocalStorage = () => {
  const storedTasks = localStorage.getItem('ToDoList');
  return JSON.parse(storedTasks) || [];
};
const addTask = (description) => {
  if (!description) {
    return 0;
  }
  const newTask = {
    description,
    completed: false,
    index: ToDoList.length + 1,
  };
  ToDoList.push(newTask);
  storeTasksToLocalStorage();
  return 0;
};
const editTask = (description, index) => {
  if (!description) {
    return; // If description is not provided, exit the function without making any changes
  }
  const todoList = JSON.parse(localStorage.getItem('ToDoList')) || [];
  const taskToEditIndex = todoList.findIndex((item) => item.index === index);
  if (taskToEditIndex !== -1) {
    todoList[taskToEditIndex].description = description;
    localStorage.setItem('ToDoList', JSON.stringify(todoList));
  }
};
const sortToDoListTasks = () => {
  ToDoList.forEach((item, index) => {
    item.index = index + 1;
  });
};
function toggleIconsVisibility(clickedItem) {
  const listItemElements = todoListElement.querySelectorAll('li');
  listItemElements.forEach((listItem) => {
    const moreIcon = listItem.querySelector('.fa-ellipsis-vertical');
    const deleteIcon = listItem.querySelector('.fa-trash');
    const editIcon = listItem.querySelector('.fa-edit');

    if (listItem === clickedItem) {
      moreIcon.style.display = 'none';
      deleteIcon.style.display = 'inline-block';
      editIcon.style.display = 'inline-block';
    } else {
      moreIcon.style.display = 'inline-block';
      deleteIcon.style.display = 'none';
      editIcon.style.display = 'none';
    }
  });
}
const RemoveTask = (index) => {
  const taskIndex = ToDoList.findIndex((task) => task.index === index);
  if (taskIndex !== -1) {
    ToDoList.splice(taskIndex, 1);
    updateIndexValues();
    storeTasksToLocalStorage();
  }
};
export {
  ToDoList,
  storeTasksToLocalStorage,
  addTask,
  editTask,
  updateIndexValues,
  retrieveTasksFromLocalStorage,
  toggleIconsVisibility,
  todoListElement,
  sortToDoListTasks,
  RemoveTask,
};

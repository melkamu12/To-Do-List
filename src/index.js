import './Style/style.css';
import {
  ToDoList,
  addTask,
  editTask,
  updateIndexValues,
  storeTasksToLocalStorage,
  retrieveTasksFromLocalStorage,
  toggleIconsVisibility,
  todoListElement,
} from './module/todo.js';
import RemoveCompletedTasks from './module/CompletedTasks.js';
import { dragStart, dragOver, drop } from './module/dragAndDrop.js';

const ToDoInput = document.getElementById('Add_To_doList');
const clearCompletedButton = document.getElementById('clearSelected');
let activeEditableItem = null;
function toggleEditable(span) {
  const listItem = span.parentElement;
  const moreIcon = listItem.querySelector('.fa-ellipsis-vertical');
  const deleteIcon = listItem.querySelector('.fa-trash');
  const editIcon = listItem.querySelector('.fa-edit');

  if (span.contentEditable === 'true') {
    span.contentEditable = 'false';
    span.classList.remove('editable');
    moreIcon.style.display = 'inline-block';
    deleteIcon.style.display = 'none';
    editIcon.style.display = 'none';
    span.style.borderStyle = '';
    span.style.borderWidth = '';
    span.style.borderColor = '';
  } else {
    if (activeEditableItem) {
      activeEditableItem.contentEditable = 'false';
      activeEditableItem.classList.remove('editable');
      activeEditableItem.parentElement.querySelector(
        '.fa-ellipsis-vertical',
      ).style.display = 'inline-block';
      activeEditableItem.parentElement.querySelector(
        '.fa-trash',
      ).style.display = 'none';
      activeEditableItem.parentElement.querySelector('.fa-edit').style.display = 'none';
      activeEditableItem.style.borderStyle = '';
      activeEditableItem.style.borderWidth = '';
      activeEditableItem.style.borderColor = '';
    }
    span.contentEditable = 'true';
    span.classList.add('editable');
    moreIcon.style.display = 'none';
    deleteIcon.style.display = 'inline-block';
    editIcon.style.display = 'inline-block';
    span.style.borderStyle = 'groove';
    span.style.borderWidth = '2px';
    span.style.borderColor = 'red';
    activeEditableItem = span;
  }

  toggleIconsVisibility();
}

function DisplayToDoList() {
  const RemoveTask = (index) => {
    const taskIndex = ToDoList.findIndex((task) => task.index === index);
    if (taskIndex !== -1) {
      ToDoList.splice(taskIndex, 1);
      updateIndexValues();
      storeTasksToLocalStorage();
      DisplayToDoList();
    }
  };
  function handleCheckboxChange(index, isChecked) {
    const itemToChange = ToDoList.find((item) => item.index === index);
    if (itemToChange) {
      itemToChange.completed = isChecked;
      storeTasksToLocalStorage();
    }
    toggleIconsVisibility();
  }
  todoListElement.innerHTML = '';

  ToDoList.forEach((item) => {
    const listItem = document.createElement('li');
    const span = document.createElement('span');
    listItem.draggable = true;
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `checkbox-${item.index}`;
    checkbox.checked = item.completed;
    checkbox.addEventListener('change', () => {
      handleCheckboxChange(item.index, checkbox.checked);
      if (checkbox.checked) {
        span.style.textDecoration = 'line-through';
      } else {
        span.style.textDecoration = 'none';
      }
    });
    if (item.completed) {
      const delElement = document.createElement('del');
      delElement.textContent = item.description;
      span.appendChild(delElement);
    } else {
      span.textContent = item.description;
    }
    span.addEventListener('dblclick', () => {
      toggleEditable(span);
    });
    span.addEventListener('blur', () => {
      const newDescription = span.textContent.trim();
      if (newDescription !== '') {
        editTask(newDescription, item.index);
        storeTasksToLocalStorage();
      }
    });

    const moreIcon = document.createElement('i');
    moreIcon.className = 'fas fa-ellipsis-vertical more-sign';
    moreIcon.setAttribute('data-index', item.index);
    moreIcon.addEventListener('click', () => {
      toggleIconsVisibility(listItem);
    });
    const editIcon = document.createElement('i');
    editIcon.className = 'fas fa-edit';
    editIcon.setAttribute('data-index', item.index);
    editIcon.style.display = 'none';
    editIcon.addEventListener('mouseover', () => {
      editIcon.style.color = 'red';
    });
    editIcon.addEventListener('mouseout', () => {
      editIcon.style.color = '';
    });
    editIcon.addEventListener('click', () => {
      toggleEditable(span);
    });
    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'fas fa-trash';
    deleteIcon.setAttribute('data-index', item.index);
    deleteIcon.style.display = 'none';
    deleteIcon.addEventListener('mouseover', () => {
      deleteIcon.style.color = 'red';
    });
    deleteIcon.addEventListener('mouseout', () => {
      deleteIcon.style.color = '';
    });
    deleteIcon.addEventListener('click', () => {
      RemoveTask(item.index);
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(span);
    listItem.appendChild(moreIcon);
    listItem.appendChild(editIcon);
    listItem.appendChild(deleteIcon);
    todoListElement.appendChild(listItem);

    listItem.addEventListener('dragstart', (event) => {
      dragStart(event, item.index);
    });
    listItem.addEventListener('dragover', dragOver);
    listItem.addEventListener('drop', (event) => {
      drop(event, item.index);
    });
    document.addEventListener('updateDisplay', () => {
      DisplayToDoList();
    });
  });
}
clearCompletedButton.addEventListener('click', () => {
  RemoveCompletedTasks();
  updateIndexValues();
  DisplayToDoList();
});
function addToDoList(description) {
  if (description === '') {
    return;
  }
  addTask(description);
  ToDoInput.value = '';
  DisplayToDoList();
}

ToDoInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    addToDoList(ToDoInput.value);
    ToDoInput.value = '';
  }
});

const icon = document.querySelector('.material-symbols-sharp');
if (icon !== null) {
  icon.addEventListener('click', (event) => {
    event.preventDefault();
    addToDoList(ToDoInput.value);
    ToDoInput.value = '';
  });
}

document.addEventListener('click', (event) => {
  const { target } = event;
  const editableSpan = target.closest('span.editable');
  const moreIcon = target.closest('.more-sign');

  if (!editableSpan && !moreIcon) {
    if (activeEditableItem) {
      toggleEditable(activeEditableItem);
    }
  }
});
document.addEventListener('mousedown', (event) => {
  const { target } = event;
  const editableSpan = target.closest('span.editable');
  const moreIcon = target.closest('.more-sign');

  if (!editableSpan && !moreIcon) {
    if (activeEditableItem) {
      toggleEditable(activeEditableItem);
      activeEditableItem = null;
    }
  }
});
retrieveTasksFromLocalStorage();
DisplayToDoList();

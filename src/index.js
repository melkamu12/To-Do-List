import './style.css';

const taskListContainer = document.getElementById('todoList');
const tasks = [
  {
    description: 'Task to be done first',
    completed: true,
    index: 1,
  },
  {
    description: 'Task to be done Second',
    completed: false,
    index: 2,
  },
  {
    description: 'Task to be done Last',
    completed: true,
    index: 3,
  },
];

function DisplayToDoList() {
  taskListContainer.innerHTML = '';
  tasks.forEach((item) => {
    const listItem = document.createElement('li');

    const leftCheckbox = document.createElement('input');
    leftCheckbox.type = 'checkbox';
    leftCheckbox.id = `checkbox-${item.index}`;
    leftCheckbox.checked = item.completed;
    listItem.appendChild(leftCheckbox);
    const description = document.createElement('span');
    description.textContent = item.description;
    listItem.appendChild(description);

    const moreSign = document.createElement('span');
    moreSign.textContent = '⋮';
    moreSign.classList.add('more-sign');
    listItem.appendChild(moreSign);
    taskListContainer.appendChild(listItem);
  });
}

DisplayToDoList();

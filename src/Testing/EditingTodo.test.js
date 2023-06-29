import { editTask } from '../module/todo.js';

describe('editTask', () => {
  beforeEach(() => {
    // Reset localStorage before each test
    localStorage.clear();
  });

  it('should edit the task description and update it in localStorage', () => {
    // Set up initial data in localStorage
    const initialTasks = [
      { index: 1, description: 'Task 1', completed: false },
      { index: 2, description: 'Task 2', completed: false },
      { index: 3, description: 'Task 3', completed: false },
    ];
    localStorage.setItem('ToDoList', JSON.stringify(initialTasks));

    // Call the editTask function to edit a task
    const newDescription = 'Updated Task';
    const index = 2;
    editTask(newDescription, index);

    // Retrieve the updated tasks from localStorage
    const updatedTasks = JSON.parse(localStorage.getItem('ToDoList'));

    // Verify that the task description is updated
    expect(updatedTasks[index - 1].description).toEqual(newDescription);
  });

  it('should not update the task description if the task index is not found', () => {
    // Set up initial data in localStorage
    const initialTasks = [
      { index: 1, description: 'Task 1', completed: false },
      { index: 2, description: 'Task 2', completed: false },
    ];
    localStorage.setItem('ToDoList', JSON.stringify(initialTasks));

    // Call the editTask function with a non-existent index
    const newDescription = 'Updated Task';
    const index = 3;
    editTask(newDescription, index);

    // Retrieve the tasks from localStorage
    const updatedTasks = JSON.parse(localStorage.getItem('ToDoList'));

    // Verify that the tasks remain unchanged
    expect(updatedTasks).toEqual(initialTasks);
  });
  it('should not update the task description if the description is not provided', () => {
    // Set up initial data in localStorage
    const initialTasks = [
      { index: 1, description: 'Task 1', completed: false },
      { index: 2, description: 'Task 2', completed: false },
    ];
    localStorage.setItem('ToDoList', JSON.stringify(initialTasks));

    // Call the editTask function without providing a description
    const newDescription = '';
    const index = 2;
    editTask(newDescription, index);

    // Retrieve the tasks from localStorage
    const updatedTasks = JSON.parse(localStorage.getItem('ToDoList'));

    // Verify that the tasks remain unchanged
    expect(updatedTasks).toEqual(initialTasks);
  });
});

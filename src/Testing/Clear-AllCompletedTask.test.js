import RemoveCompletedTasks from '../module/CompletedTasks.js';
import { ToDoList, storeTasksToLocalStorage } from '../module/todo.js';

jest.mock('../module/todo.js', () => ({
  ToDoList: [
    { description: 'Task 1', completed: true, index: 1 },
    { description: 'Task 2', completed: false, index: 2 },
    { description: 'Task 3', completed: true, index: 3 },
    { description: 'Task 4', completed: false, index: 4 },
  ],
  storeTasksToLocalStorage: jest.fn(),
}));

describe('RemoveCompletedTasks', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should remove completed tasks and update local storage', () => {
    RemoveCompletedTasks();

    // Verify that completed tasks are removed from the ToDoList
    expect(ToDoList.length).toBe(2);
    expect(ToDoList[0].description).toBe('Task 2');
    expect(ToDoList[1].description).toBe('Task 4');

    // Verify that storeTasksToLocalStorage is called with the updated ToDoList
    expect(storeTasksToLocalStorage).toHaveBeenCalledWith(ToDoList);
  });
  it('should not remove any tasks if ToDoList is empty', () => {
    ToDoList.length = 0;
    RemoveCompletedTasks();
    expect(ToDoList.length).toBe(0);
    expect(storeTasksToLocalStorage).toHaveBeenCalledWith(ToDoList);
  });
  it('should not remove any tasks if there are no completed tasks', () => {
    // Set all tasks to not completed
    ToDoList.forEach((task) => {
      task.completed = false;
    });
    const initialTaskCount = ToDoList.length;
    RemoveCompletedTasks();
    expect(ToDoList.length).toBe(initialTaskCount);
    expect(storeTasksToLocalStorage).toHaveBeenCalledWith(ToDoList);
  });
  it('should remove only completed tasks and leave incomplete tasks untouched', () => {
    ToDoList.forEach((task, index) => {
      task.completed = index % 2 === 0;
    });

    const initialTaskCount = ToDoList.length;
    const initialCompletedTaskCount = ToDoList.filter(
      (task) => task.completed,
    ).length;
    const initialIncompleteTaskCount = ToDoList.filter(
      (task) => !task.completed,
    ).length;

    RemoveCompletedTasks();
    expect(ToDoList.length).toBe(initialTaskCount - initialCompletedTaskCount);
    expect(ToDoList.filter((task) => !task.completed).length).toBe(
      initialIncompleteTaskCount,
    );
    expect(storeTasksToLocalStorage).toHaveBeenCalledWith(ToDoList);
  });
  it('should remove all completed tasks if all tasks are completed', () => {
    ToDoList.forEach((task) => {
      task.completed = true;
    });
    RemoveCompletedTasks();
    expect(ToDoList.length).toBe(0);
    expect(storeTasksToLocalStorage).toHaveBeenCalledWith(ToDoList);
  });
});

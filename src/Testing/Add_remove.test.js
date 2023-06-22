import {
  ToDoList,
  updateIndexValues,
  addTask,
  RemoveTask,
} from '../module/todo.js';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

// Mock global localStorage in the module scope
Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
});

// Mock DOM
const todoListContainerMock = document.createElement('div');
const addBtnMock = document.createElement('button');
const clearBtnMock = document.createElement('button');

document.getElementById = jest.fn((id) => {
  if (id === 'todoList') return todoListContainerMock;
  if (id === 'addBtn') return addBtnMock;
  return 0;
});

document.querySelector = jest.fn((selector) => {
  if (selector === '.clear-completed') return clearBtnMock;
  return 0;
});

describe('TodosOperations', () => {
  beforeEach(() => {
    ToDoList.length = 0;
    jest.clearAllMocks();
  });

  describe('addTask', () => {
    test('should add a new task to the todos array and update localStorage', () => {
      const taskDescription = 'To do List 1';
      addTask(taskDescription);

      expect(ToDoList).toHaveLength(1);
      expect(ToDoList[0].description).toBe(taskDescription);
      expect(ToDoList[0].completed).toBe(false);
      expect(ToDoList[0].index).toBe(1);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'ToDoList',
        JSON.stringify(ToDoList),
      );
    });
    test('should not add a task if the description is empty', () => {
      const taskDescription = '';
      addTask(taskDescription);

      expect(ToDoList).toHaveLength(0);
      expect(localStorage.setItem).not.toHaveBeenCalled();
    });
    test('should Update the index values of', () => {
      // Arrange
      ToDoList.push(
        { description: 'Task 1', completed: false, index: 1 },
        { description: 'Task 2', completed: false, index: 2 },
        { description: 'Task 3', completed: false, index: 3 },
      );
      // Act
      updateIndexValues();
      // Assert
      expect(ToDoList).toHaveLength(3);
    });
  });

  describe('removeTodo', () => {
    // Arrange
    test('should remove a task from the todos array and update localStorage', () => {
      // Arrange
      ToDoList.push(
        { description: 'Task 1', completed: false, index: 1 },
        { description: 'Task 2', completed: false, index: 2 },
        { description: 'Task 3', completed: false, index: 3 },
      );

      // Act
      RemoveTask(2);

      // Assert
      expect(ToDoList).toHaveLength(2);
      expect(ToDoList[0].description).toBe('Task 1');
      expect(ToDoList[0].index).toBe(1);
      expect(ToDoList[1].description).toBe('Task 3');
      expect(ToDoList[1].index).toBe(2);

      // Verify localStorage
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'ToDoList',
        JSON.stringify(ToDoList),
      );
    });
    test('should not remove any tasks if the localstorage is empty', () => {
      localStorage.clear();
      RemoveTask(1);

      expect(ToDoList).toHaveLength(0);
      expect(localStorage.getItem('ToDoList')).toBeUndefined();
    });
  });
});

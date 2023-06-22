import updateStatus from '../module/statuscompleted.js';
import { ToDoList } from '../module/todo.js';

describe('updateStatus', () => {
  let localStorageMock;

  beforeEach(() => {
    localStorageMock = {
      getItem: jest.fn(() => JSON.stringify(ToDoList)),
      setItem: jest.fn(),
    };

    // Set initial data
    ToDoList.splice(
      0,
      ToDoList.length, // Clear the array
      { description: 'Task 1', completed: false, index: 1 },
      { description: 'Task 2', completed: false, index: 2 },
    );

    Object.defineProperty(global, 'localStorage', { value: localStorageMock });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should update the status of the item and store changes in localStorage', () => {
    const index = 2;
    const isChecked = true;
    updateStatus(index, isChecked);
    const updatedTask = ToDoList.find((item) => item.index === index);
    expect(updatedTask.completed).toBe(isChecked);
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
  });

  it('should not update the status if the item index is not found', () => {
    const index = 3;
    const isChecked = true;
    try {
      updateStatus(index, isChecked);
    } catch (error) {
      expect(error.message).toBe(`Item with index ${index} not found.`);
    } finally {
      expect(localStorageMock.setItem).not.toHaveBeenCalled();
    }
  });
  it('should update the status of the item to false', () => {
    const index = 1;
    const isChecked = false;
    updateStatus(index, isChecked);
    const updatedTask = ToDoList.find((item) => item.index === index);
    expect(updatedTask.completed).toBe(isChecked);
  });
  it('should not update the status if the item index is not provided', () => {
    const index = undefined;
    const isChecked = true;
    expect(() => updateStatus(index, isChecked)).toThrow(
      'Item index is required.',
    );
    expect(localStorageMock.setItem).not.toHaveBeenCalled();
  });
});

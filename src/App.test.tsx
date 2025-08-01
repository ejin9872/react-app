import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;

beforeEach(() => {
  localStorageMock.getItem.mockReturnValue(null);
  localStorageMock.setItem.mockClear();
});

test('renders to-do app title', () => {
  render(<App />);
  const titleElement = screen.getByText(/My To-Do List/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders input field and add button', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/What needs to be done/i);
  const addButton = screen.getByText(/Add Task/i);
  
  expect(inputElement).toBeInTheDocument();
  expect(addButton).toBeInTheDocument();
});

test('can add a new todo', async () => {
  render(<App />);
  
  const inputElement = screen.getByPlaceholderText(/What needs to be done/i);
  const addButton = screen.getByText(/Add Task/i);
  
  await userEvent.type(inputElement, 'Test todo item');
  await userEvent.click(addButton);
  
  expect(screen.getByText('Test todo item')).toBeInTheDocument();
});

test('can toggle todo completion', async () => {
  render(<App />);
  
  // Add a todo first
  const inputElement = screen.getByPlaceholderText(/What needs to be done/i);
  await userEvent.type(inputElement, 'Test todo item');
  await userEvent.click(screen.getByText(/Add Task/i));
  
  // Toggle completion
  const checkbox = screen.getByRole('checkbox');
  await userEvent.click(checkbox);
  
  expect(checkbox).toBeChecked();
});

test('can delete a todo', async () => {
  render(<App />);
  
  // Add a todo first
  const inputElement = screen.getByPlaceholderText(/What needs to be done/i);
  await userEvent.type(inputElement, 'Test todo item');
  await userEvent.click(screen.getByText(/Add Task/i));
  
  // Delete the todo
  const deleteButton = screen.getByText(/Delete/i);
  await userEvent.click(deleteButton);
  
  expect(screen.queryByText('Test todo item')).not.toBeInTheDocument();
});

test('shows correct task count', async () => {
  render(<App />);
  
  // Add a todo
  const inputElement = screen.getByPlaceholderText(/What needs to be done/i);
  await userEvent.type(inputElement, 'Test todo item');
  await userEvent.click(screen.getByText(/Add Task/i));
  
  expect(screen.getByText(/1 task remaining/i)).toBeInTheDocument();
});

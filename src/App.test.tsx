import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
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

afterEach(cleanup);

test('renders app title', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: /Restaurant Picks/i })).toBeInTheDocument();
});

test('renders default restaurants', () => {
  render(<App />);
  expect(screen.getByText('Sakura Sushi')).toBeInTheDocument();
  expect(screen.getByText('Trattoria Bella')).toBeInTheDocument();
  expect(screen.getByText('El Fuego Cantina')).toBeInTheDocument();
});

test('can toggle favorite on a restaurant', async () => {
  render(<App />);
  const favButtons = screen.getAllByTitle('Add to favorites');
  await userEvent.click(favButtons[0]);
  expect(screen.getByTitle('Remove from favorites')).toBeInTheDocument();
});

test('can mark a restaurant as visited', async () => {
  render(<App />);
  const visitButtons = screen.getAllByTitle('Mark as visited');
  await userEvent.click(visitButtons[0]);
  expect(screen.getAllByTitle('Mark as not visited').length).toBeGreaterThan(0);
});

test('can search restaurants by name', async () => {
  render(<App />);
  expect(screen.getByText('Sakura Sushi')).toBeInTheDocument();
  const searchInput = screen.getByPlaceholderText(/Search/i);
  await userEvent.type(searchInput, 'Sakura');
  expect(screen.getByText('Sakura Sushi')).toBeInTheDocument();
  expect(screen.queryByText('Trattoria Bella')).not.toBeInTheDocument();
});

test('can remove a restaurant', async () => {
  render(<App />);
  expect(screen.getByText('Sakura Sushi')).toBeInTheDocument();
  const removeButtons = screen.getAllByTitle('Remove restaurant');
  await userEvent.click(removeButtons[0]);
  expect(screen.queryByText('Sakura Sushi')).not.toBeInTheDocument();
});

test('shows restaurants left to try count', () => {
  render(<App />);
  expect(screen.getByText(/restaurants left to try/i)).toBeInTheDocument();
});

import React, { useState, useEffect } from 'react';
import './App.css';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

type FilterType = 'all' | 'active' | 'completed';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt)
      }));
      setTodos(parsedTodos);
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date()
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const startEditing = (id: number, text: string) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = () => {
    if (editingText.trim() !== '') {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editingText.trim() } : todo
      ));
    }
    setEditingId(null);
    setEditingText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  return (
    <div className="App">
      <div className="todo-container">
        <h1>My To-Do List</h1>
        
        {/* Add new todo */}
        <div className="add-todo">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, addTodo)}
            placeholder="What needs to be done?"
            className="todo-input"
          />
          <button onClick={addTodo} className="add-button">
            Add Task
          </button>
        </div>

        {/* Filter buttons */}
        <div className="filters">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All ({todos.length})
          </button>
          <button
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
          >
            Active ({activeTodosCount})
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Completed ({todos.length - activeTodosCount})
          </button>
        </div>

        {/* Todo list */}
        <div className="todo-list">
          {filteredTodos.length === 0 ? (
            <p className="empty-message">
              {filter === 'all' && todos.length === 0 
                ? "No tasks yet. Add one above!" 
                : filter === 'active' 
                  ? "No active tasks!"
                  : "No completed tasks!"
              }
            </p>
          ) : (
            filteredTodos.map(todo => (
              <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="todo-checkbox"
                />
                
                {editingId === todo.id ? (
                  <div className="edit-todo">
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, saveEdit)}
                      className="edit-input"
                      autoFocus
                    />
                    <button onClick={saveEdit} className="save-button">Save</button>
                    <button onClick={cancelEdit} className="cancel-button">Cancel</button>
                  </div>
                ) : (
                  <div className="todo-content">
                    <span 
                      className="todo-text"
                      onDoubleClick={() => startEditing(todo.id, todo.text)}
                    >
                      {todo.text}
                    </span>
                    <div className="todo-actions">
                      <button 
                        onClick={() => startEditing(todo.id, todo.text)}
                        className="edit-button"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => deleteTodo(todo.id)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer with task count */}
        {todos.length > 0 && (
          <div className="todo-footer">
            <p>{activeTodosCount} task{activeTodosCount !== 1 ? 's' : ''} remaining</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle, Circle } from 'lucide-react';

type Todo = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
};

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Fetch todos
  const fetchTodos = async () => {
    const res = await fetch('/api/todos');
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Tambah Todo
  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });

    setTitle('');
    setDescription('');
    fetchTodos();
  };

  // Toggle Complete
  const toggleComplete = async (id: number) => {
    await fetch(`/api/todos/${id}`, { method: 'PATCH' });
    fetchTodos();
  };

  // Hapus Todo
  const deleteTodo = async (id: number) => {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    fetchTodos();
  };

  return (
    <div className="space-y-8">
      {/* Form Tambah Task */}
      <form onSubmit={addTodo} className="bg-white p-6 rounded-2xl shadow-sm border">
        <h2 className="text-lg font-semibold mb-4">Tambah Tugas Baru</h2>
        <div className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Judul tugas..."
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Deskripsi (opsional)"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-y"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition"
          >
            <Plus size={20} />
            Tambah Tugas
          </button>
        </div>
      </form>

      {/* Daftar Todo */}
      <div className="space-y-3">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500 py-12">Belum ada tugas. Tambahkan yang pertama!</p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className="bg-white p-5 rounded-2xl shadow-sm border flex items-start gap-4 group"
            >
              <button
                onClick={() => toggleComplete(todo.id)}
                className="mt-1 text-gray-400 hover:text-blue-600 transition"
              >
                {todo.completed ? <CheckCircle className="text-green-500" /> : <Circle />}
              </button>

              <div className="flex-1">
                <p className={`font-medium ${todo.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                  {todo.title}
                </p>
                {todo.description && (
                  <p className="text-sm text-gray-500 mt-1">{todo.description}</p>
                )}
              </div>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600 transition"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
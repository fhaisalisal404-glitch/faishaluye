import TodoList from '@/components/TodoList';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            My Tasks
          </h1>
          <p className="text-gray-600">Kelola tugas Anda dengan lebih baik</p>
        </div>
        <TodoList />
      </div>
    </main>
  );
}
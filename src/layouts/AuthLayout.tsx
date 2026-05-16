import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Outlet />
      </main>
      <footer className="bg-gray-200 border-t border-gray-300 py-4 px-6">
        <p className="text-center text-sm text-gray-500">© 2025 Shifty</p>
      </footer>
    </div>
  );
}

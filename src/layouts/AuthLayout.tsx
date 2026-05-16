import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Outlet />
      </main>
      <footer className="bg-gray-100 border-t border-gray-200 py-6 px-6">
        <div className="flex items-center justify-between max-w-3xl mx-auto w-full px-4">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Shifty</p>
          <div className="flex gap-4">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">利用規約</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">プライバシーポリシー</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

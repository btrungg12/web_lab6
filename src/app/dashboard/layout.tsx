// src/app/dashboard/layout.tsx
import Link from 'next/link';
import ThemeToggle from '../../components/ThemeToggle';
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar cố định - Server Rendered */}
      <aside className="w-64 bg-white shadow-md flex flex-col p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-8">AI Knowledge</h2>
        
        <nav className="flex-1 space-y-4">
          <Link href="/dashboard" className="block p-2 rounded hover:bg-gray-100 text-gray-700">
            📚 Tất cả tài liệu
          </Link>
          <Link href="/dashboard/add" className="block p-2 rounded hover:bg-gray-100 text-gray-700">
            ➕ Thêm mới
          </Link>
        </nav>

        {/* Client Component được nhúng vào Server Layout */}
        <div className="mt-auto pt-6 border-t">
          <ThemeToggle />
        </div>
      </aside>

      {/* Nội dung chính thay đổi theo từng trang */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
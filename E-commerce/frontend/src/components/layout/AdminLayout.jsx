import { Outlet, Link } from 'react-router-dom';

const AdminLayout = () => (
  <div className="min-h-screen bg-gray-50 flex">
    <aside className="w-64 bg-white border-r h-screen sticky top-0 p-6 space-y-8">
      <h2 className="text-xl font-bold text-indigo-600">Admin Panel</h2>
      <nav className="space-y-2">
        <Link to="/admin" className="block p-3 hover:bg-indigo-50 rounded-lg text-gray-700">Dashboard</Link>
        <Link to="/admin/products" className="block p-3 hover:bg-indigo-50 rounded-lg text-gray-700">Products</Link>
        <Link to="/" className="block p-3 text-red-500 mt-10">Back to Shop</Link>
      </nav>
    </aside>
    <main className="flex-1">
      <Outlet />
    </main>
  </div>
);
export default AdminLayout;
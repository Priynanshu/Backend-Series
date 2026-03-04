import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const { pathname } = useLocation();
  const menu = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Manage Products', path: '/admin/products' },
    { name: 'Add Product', path: '/admin/add-product' },
    { name: 'Orders', path: '/admin/orders' },
  ];

  return (
    <aside className="w-72 bg-white border-r min-h-screen p-6 sticky top-0">
      <div className="mb-10 px-2">
        <h1 className="text-2xl font-black text-indigo-600 tracking-tight">LUXE ADMIN</h1>
      </div>
      <nav className="space-y-1">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
              pathname === item.path ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-indigo-50'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};
export default AdminSidebar;
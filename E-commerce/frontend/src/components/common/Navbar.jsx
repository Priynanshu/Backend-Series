import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { productContext } from '../../context/ProductProvider'; 
import { AuthContext } from '../../context/AuthProvider'; // AuthContext import karein
import { handleSuccess } from '../../utils/utilsToast';

const Navbar = () => {
  const { cart } = useContext(productContext);
  const navigate = useNavigate()
  const { user, logoutUser } = useContext(AuthContext); // User aur Logout function nikaalein

  const totalItems = cart?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const handleLogout = async () => {
    try {
        const response = await logoutUser(); 
        handleSuccess(response?.data?.message || "Logged out successfully");
        navigate("/login")
        
    } catch (err) {
        console.error("Logout Error:", err);
    }
};

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-indigo-600">LUXE</Link>
        
        <div className="hidden md:flex space-x-8 text-gray-600 font-medium items-center">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <Link to="/products" className="hover:text-indigo-600">Shop</Link>
          
          {/* 1. Admin Link Logic: Sirf admin role waalo ko dikhega */}
          {user && user.role === 'admin' && (
            <Link to="/admin" className="hover:text-indigo-600 font-bold text-indigo-500">
              Admin
            </Link>
          )}
        </div>

        <div className="flex items-center space-x-6">
          {/* 2. Login/Logout Toggle Logic */}
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 hidden lg:inline">Hi, {user.username}</span>
              <button 
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700 font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-indigo-600">Login</Link>
              <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700">
                Register
              </Link>
            </div>
          )}
          
          <Link to="/cart" className="relative p-2">
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {totalItems}
              </span>
            )}
            
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
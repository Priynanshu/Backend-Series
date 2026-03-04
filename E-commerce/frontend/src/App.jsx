import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts
import UserLayout from './components/layout/UserLayout';
import AdminLayout from './components/layout/AdminLayout';

// User Pages
import Home from './pages/user/Home';
import ProductListing from './pages/user/ProductListing';
import ProductDetails from './pages/user/ProductDetails';
import Cart from './pages/user/Cart';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import ManageProducts from './pages/admin/ManageProducts';
import AddProduct from './pages/admin/AddProduct';
import Orders from './pages/admin/Orders';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          {/* USER ROUTES */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<ProductListing />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="cart" element={<Cart />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* ADMIN ROUTES */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ManageProducts />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="orders" element={<Orders />} />
            {/* Yahan Users Management ka table ManageProducts jaisa hi use kar sakte hain */}
            <Route path="users" element={<Dashboard />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
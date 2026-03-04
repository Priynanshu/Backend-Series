import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../../utils/utilsToast';

const Login = () => {
  const {loginUser} = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await loginUser(formData);

      handleSuccess(res.message);

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong";

      handleError(errorMessage);

      console.log("Error From register: ", err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-4xl shadow-2xl shadow-indigo-100/50 border border-gray-50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Sign in to continue shopping</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value })
              }}
              type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="name@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value })
              }}
              type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="••••••••" />
          </div>
          <Button type='submit' className="w-full py-3.5 mt-4">
            {loading ? "loging account..." : "Log In"}
          </Button>
        </form>
        <div className="mt-8 text-center text-gray-600">
          New here? <Link to="/register" className="text-indigo-600 font-bold">Create an account</Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { useContext } from 'react';
import { useState } from 'react';
import { handleError, handleSuccess } from '../../utils/utilsToast';
import { AuthContext } from '../../context/AuthProvider';
import { ToastContainer } from 'react-toastify';

const Register = () => {
  const { registerUser } = useContext(AuthContext)
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

      const res = await registerUser(formData);

      // ✅ backend ka message use karo
      handleSuccess(res.message);

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (err) {
      // ✅ backend error message safely extract karo
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
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border border-gray-50">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-500 mt-2">Join our premium community today</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              value={formData.username}
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value })
              }}
              type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="John Doe" />
          </div>
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
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>
        <p className="text-center text-gray-600 mt-8">
          Already have an account? <Link to="/login" className="text-indigo-600 font-bold hover:underline">Sign In</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Register
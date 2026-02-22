import React from 'react';
import { useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { handleSuccess } from '../utils/utilsToast';
import { ToastContainer } from 'react-toastify';
import { TaskContext } from '../context/TaskProvider';

const Navbar = () => {
  const navigate = useNavigate()
  const { user, logout } = useContext(AuthContext);
  const {searchTerm, setSearchTerm} = useContext(TaskContext)

  const handleLogout = async () => {
    await logout()
    handleSuccess("Logout Successfully")
    setTimeout(() => {
      navigate("/login")
    }, 1000)
  }

  return (
    <div>
      <nav className="bg-[#0b121f] border-b border-[#1f2937] px-6 py-3 flex items-center justify-between sticky top-0 z-40">

        {/* Left Section: Logo & Links */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-[#1e293b] p-1.5 rounded-md border border-[#3b82f6]/30">
              <i className="fas fa-file-alt text-[#3b82f6] text-lg"></i>
            </div>
            <h1 className="text-white font-bold text-xl tracking-tight">TaskMaster</h1>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-white text-sm font-medium hover:text-[#3b82f6] transition-colors">Home</Link>
            <Link to="/about" className="text-[#9ca3af] text-sm font-medium hover:text-white transition-colors">About</Link>
          </div>
        </div>

        {/* Center Section: Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative group">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af] text-sm group-focus-within:text-[#3b82f6] transition-colors"></i>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tasks..."
              className="w-full bg-[#1e293b]/50 border border-[#374151] rounded-lg py-2 pl-11 pr-4 text-white text-sm outline-none focus:border-[#3b82f6] focus:bg-[#1e293b] transition-all placeholder:text-[#6b7280]"
            />
          </div>
        </div>

        {/* Right Section: Actions & Profile */}
        <div className="flex items-center gap-4">
          {user ? (
            /* Fragment use kiya hai taaki multiple elements render ho sakein */
            <>
              <Link
                to="/create-task"
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-blue-500/10 active:scale-95"
              >
                <i className="fas fa-plus text-xs"></i>
                <span className="hidden sm:inline">Create Task</span>
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 cursor-pointer text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-blue-500/10 active:scale-95"
              >
                Logout
              </button>

              <div className="h-6 w-px bg-[#1f2937] mx-1"></div>

              <Link to={`/profile/${user?.userId || user?._id || user?.id}`} className="w-9 h-9 bg-[#fcd34d] rounded-full flex items-center justify-center cursor-pointer border-2 border-transparent hover:border-[#3b82f6] transition-all overflow-hidden">
                <img
                  src={user?.profileImg || `https://ui-avatars.com/api/?name=${user?.username}`}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-blue-500/10 active:scale-95"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-blue-500/10 active:scale-95"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
      <ToastContainer />
    </div>
  );
};

export default Navbar;
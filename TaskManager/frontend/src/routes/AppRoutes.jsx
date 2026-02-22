import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import DashboardLayout from "../layout/DashboardLayout";
import CreateTask from "../components/CreateTask";
import EditTask from "../components/EditTask";
import ProtectedRoute from "../components/ProtectedRoutes";
import Profile from "../pages/Profile";

function AppRoutes() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* App Layout */}
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Route>
      <Route path="/create-task" element={<CreateTask />} />
      <Route path="/edit-task/:id" element={<EditTask />} />
    </Routes>
  );
}

export default AppRoutes;
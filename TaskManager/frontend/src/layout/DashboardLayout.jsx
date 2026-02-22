import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a] text-white">
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
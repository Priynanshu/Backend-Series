import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TaskContext } from "../context/TaskProvider";
import { AuthContext } from "../context/AuthProvider"; // ✅ AuthContext import kiya

const TaskCard = ({ item }) => {
  const { setTask, deleteTask } = useContext(TaskContext);
  const { user } = useContext(AuthContext); // ✅ Logged-in user nikala

  // ✅ Check owner: Kya ye task current user ka hai?
  const isOwner = user && (user.userId === item.user || user.userId === item.user?._id);

  const isCompleted = item.status === "completed";

  const priorityColor = {
    High: "bg-red-500/20 text-red-500",
    Medium: "bg-orange-500/20 text-orange-500",
    Low: "bg-emerald-500/20 text-emerald-500",
  };

  const handleToggle = () => {
    // Toggle bhi tabhi kaam karega agar user owner ho (optional but safer)
    if(!isOwner) return; 

    const newStatus = isCompleted ? "pending" : "completed";
    setTask((prev) =>
      prev.map((t) =>
        t._id === item._id ? { ...t, status: newStatus } : t
      )
    );
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;
    await deleteTask(item._id);
  };

  return (
    <div className={`group bg-[#111b2d] border border-[#1f2937] rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 ${isCompleted ? "opacity-75" : "opacity-100"}`}>
      
      {/* Banner Image Container */}
      <div className="w-full h-40 overflow-hidden">
        <img
          src={item.coverImage}
          alt="task"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className={`text-white font-bold text-lg mb-2 ${isCompleted ? "line-through text-gray-500" : ""}`}>
          {item.title}
        </h3>
        <p className={`text-[#9ca3af] text-sm line-clamp-2 mb-4 ${isCompleted ? "line-through" : ""}`}>
          {item.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full ${priorityColor[item.priority] || priorityColor.low}`}>
            {item.priority}
          </span>
          <span className="text-[#9ca3af] text-xs flex items-center gap-1">
            <i className="far fa-calendar"></i> {item.date}
          </span>
        </div>

        <div className="flex items-center gap-3 p-2 bg-[#1f2937] rounded-lg mb-6">
          <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
            {item.assign?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="flex flex-col truncate">
            <span className="text-white text-xs truncate">
              {item.assign || "Unassigned"}
            </span>
             {/* Chota sa tag dikhane ke liye ki ye aapka hai */}
             {isOwner && <span className="text-[9px] text-blue-400 font-bold">YOU</span>}
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-[#1f2937] flex justify-between items-center">
          <div onClick={handleToggle} className={`flex items-center gap-2 ${isOwner ? "cursor-pointer" : "cursor-default"} group/toggle`}>
             <div className={`w-8 h-4 rounded-full relative transition-all ${isCompleted ? "bg-green-500" : "bg-gray-600"}`}>
                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${isCompleted ? "right-1" : "left-1"}`}></div>
             </div>
             <span className="text-xs text-[#9ca3af] group-hover/toggle:text-white">{isCompleted ? "Completed" : "Pending"}</span>
          </div>

          {/* ✅ Buttons wrapped in isOwner check */}
          {isOwner && (
            <div className="flex gap-3 text-[#9ca3af]">
              <Link to={`/edit-task/${item._id}`} className="hover:text-white"><i className="fas fa-edit"></i></Link>
              <button onClick={handleDelete} className="hover:text-red-500"><i className="fas fa-trash"></i></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
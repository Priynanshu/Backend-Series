import React, { useContext, useEffect, useRef, useState } from "react";
import TaskCard from "../components/TaskCard";
import { TaskContext } from "../context/TaskProvider";
import { CheckCircle2, Clock, ListChecks, Edit2, X, Mail, User, Camera, Rocket } from 'lucide-react';
import { AuthContext } from "../context/AuthProvider";
import { handleError, handleSuccess } from "../utils/utilsToast";
import { useParams } from "react-router-dom";
import useAuthAction from "../hooks/useAuthAction";

const Profile = () => {
    const { id } = useParams();
    const fileRef = useRef(null);
    const protect = useAuthAction();
    const { task, searchTerm } = useContext(TaskContext);
    const { user, editUser } = useContext(AuthContext);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [filter, setFilter] = useState("all"); // 🟢 New Filter State
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [editData, setEditData] = useState({
        username: "",
        bio: ""
    });

    // Dynamic Stats Calculation
    const completedTasksCount = task.filter(t => t.status === "completed" || t.completed === true).length;
    const pendingTasksCount = task.length - completedTasksCount;

    useEffect(() => {
        if (user) {
            setEditData({
                username: user.username || "",
                bio: user.bio || ""
            });
            setPreview(user.profileImg || "");
        }
    }, [user, id]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        protect(async () => {
            try {
                const formData = new FormData();
                formData.append("username", editData.username);
                formData.append("bio", editData.bio);
                if (image) formData.append("profileImg", image);

                await editUser(id, formData);
                handleSuccess("Profile Edited Successfully");
                setIsEditModalOpen(false);
                setImage(null);
            } catch (err) {
                handleError("Failed To Edit");
                console.error(err);
            }
        });
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-[#0b1120] flex items-center justify-center">
                <p className="text-white text-lg">Redirecting to login...</p>
            </div>
        );
    }

    // 🟢 Updated Filtering Logic (Search + Status Filter)
    const filteredTasks = task.filter((t) => {
        const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase());
        const isCompleted = t.status === "completed" || t.completed === true;

        if (filter === "pending") return matchesSearch && !isCompleted;
        if (filter === "completed") return matchesSearch && isCompleted;
        return matchesSearch; // for "all"
    });

    return (
        <div className="min-h-screen bg-[#0b1120] text-white p-6 md:p-10 relative">
            <input type="file" ref={fileRef} onChange={handleImageChange} className="hidden" accept="image/*" />

            {/* --- User Profile Section --- (Same as before) */}
            <div className="bg-[#1e293b]/30 p-8 rounded-3xl border border-slate-800 mb-10 flex flex-col md:flex-row items-center gap-8 backdrop-blur-sm">
                <div className="relative group overflow-hidden rounded-full w-32 h-32 border-4 border-blue-500/50">
                    <img
                        src={user.profileImg || "https://avatar.iran.liara.run/public/30"}
                        alt="Profile"
                        className="w-full h-full object-cover shadow-2xl"
                    />
                </div>
                <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                        <h1 className="text-3xl font-extrabold tracking-tight">Welcome back, {user.username}! 👋</h1>
                        <button onClick={() => setIsEditModalOpen(true)} className="w-fit self-center md:self-auto bg-slate-800 hover:bg-slate-700 p-2 rounded-lg transition-colors border border-slate-700">
                            <Edit2 size={16} className="text-blue-400" />
                        </button>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-400 mb-4">
                        <span className="flex items-center gap-1 text-sm"><Mail size={14} /> {user.email}</span>
                    </div>
                    <p className="text-slate-300 max-w-2xl leading-relaxed italic border-l-2 border-blue-500/30 pl-4">
                        "{user.bio || "No bio added yet."}"
                    </p>
                </div>
            </div>

            {/* --- Stats Section --- (Same as before) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                <div className="bg-[#1e293b]/50 p-6 rounded-2xl border border-slate-800 flex justify-between items-center transition-transform hover:scale-[1.02]">
                    <div><p className="text-slate-400 text-sm font-medium">Total Tasks</p><h3 className="text-2xl font-bold">{task.length}</h3></div>
                    <ListChecks className="text-blue-500 opacity-50" size={32} />
                </div>
                <div className="bg-[#1e293b]/50 p-6 rounded-2xl border border-slate-800 flex justify-between items-center transition-transform hover:scale-[1.02]">
                    <div><p className="text-slate-400 text-sm font-medium">Pending</p><h3 className="text-2xl font-bold">{pendingTasksCount}</h3></div>
                    <Clock className="text-orange-500 opacity-50" size={32} />
                </div>
                <div className="bg-[#1e293b]/50 p-6 rounded-2xl border border-slate-800 flex justify-between items-center transition-transform hover:scale-[1.02]">
                    <div><p className="text-slate-400 text-sm font-medium">Completed</p><h3 className="text-2xl font-bold">{completedTasksCount}</h3></div>
                    <CheckCircle2 className="text-green-500 opacity-50" size={32} />
                </div>
            </div>

            {/* --- Recent Tasks Section --- */}
            <div className="bg-[#1e293b]/20 rounded-3xl border border-slate-800/50 p-6 md:p-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                    <h2 className="text-2xl font-bold border-l-4 border-blue-500 pl-3">Recent Tasks</h2>

                    {/* 🟢 Interactive Filter Buttons */}
                    <div className="flex bg-[#0b1120] p-1 rounded-xl border border-slate-800">
                        <button
                            onClick={() => setFilter("all")}
                            className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${filter === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter("pending")}
                            className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${filter === 'pending' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                            Pending
                        </button>
                        <button
                            onClick={() => setFilter("completed")}
                            className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${filter === 'completed' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                            Completed
                        </button>
                    </div>
                </div>

                {filteredTasks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-4">
                        {filteredTasks.map((item) => (
                            <TaskCard key={item._id} item={item} />
                        ))}
                    </div>
                ) : (
                    /* Empty State Box */
                    <div className="flex flex-col items-center justify-center py-20 bg-[#0b1120]/50 rounded-2xl border-2 border-dashed border-slate-800">
                        <div className="bg-slate-800/50 p-4 rounded-full mb-4">
                            <ListChecks size={40} className="text-slate-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-300 mb-2">No {filter !== 'all' ? filter : ''} tasks found</h3>
                        <p className="text-slate-500 text-center max-w-xs text-sm">
                            {searchTerm ? "Try searching with a different keyword" : "No tasks matching the selected filter."}
                        </p>
                    </div>
                )}
            </div>

            {/* --- Edit Profile Modal --- */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all">
                    <div className="bg-[#1e293b] w-full max-w-md rounded-3xl border border-slate-700 py-2 px-8 shadow-2xl overflow-y-auto max-h-[90vh] animate-in fade-in zoom-in duration-200">

                        {/* Header */}
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-bold flex items-center gap-2 text-blue-400">
                                <User size={20} /> Update Profile
                            </h2>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSaveProfile} className="space-y-4">

                            {/* Profile Image Upload Section */}
                            <div className="flex flex-col items-center gap-4 mb-4">
                                <div
                                    className="relative w-28 h-28 cursor-pointer group"
                                    onClick={() => fileRef.current.click()}
                                >
                                    <img
                                        src={preview || "https://avatar.iran.liara.run/public/30"}
                                        className="w-full h-full rounded-full object-cover border-4 border-slate-800 group-hover:border-blue-500/50 transition-all p-0.5"
                                        alt="Preview"
                                    />
                                    {/* Overlay on Hover */}
                                    <div className="absolute inset-0 bg-black/50 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera size={24} className="text-white mb-1" />
                                        <span className="text-[10px] text-white font-medium uppercase tracking-wider">Change</span>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-medium text-slate-300">Profile Picture</p>
                                    <p className="text-xs text-slate-500">JPG, PNG or WebP</p>
                                </div>
                            </div>

                            {/* Input Fields */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                        Username
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                        <input
                                            type="text"
                                            className="w-full bg-[#0b1120] border border-slate-700 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm"
                                            value={editData.username}
                                            onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                                            required
                                            placeholder="Enter username"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                        About / Bio
                                    </label>
                                    <textarea
                                        className="w-full bg-[#0b1120] border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm h-32 resize-none"
                                        value={editData.bio}
                                        onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                                        placeholder="Write a short bio about yourself..."
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl transition-all active:scale-95 text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95 text-sm"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
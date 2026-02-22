import axios from "axios";
import React, { useEffect, useState, createContext, useContext, useCallback } from "react";
import { AuthContext } from "./AuthProvider";

export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [task, setTask] = useState([]); // Personal Tasks state
    const [homeTasks, setHomeTasks] = useState([]); // All Users Tasks state
    const [searchTerm, setSearchTerm] = useState("");

    // API Base URL (optional variable for cleanliness)
    const API_BASE = "http://localhost:3000/api/task";

    // 1. Fetch Personal Tasks (Only for logged-in user)
    const getPersonalTasks = useCallback(async () => {
        try {
            const response = await axios.get(`${API_BASE}/tasks`, { withCredentials: true });
            setTask(response.data.tasks || []);
        } catch (err) {
            console.error("Error fetching personal tasks:", err);
        }
    }, []);

    // 2. Fetch All Tasks (For Home page)
    const getAllHomeTasks = useCallback(async () => {
        try {
            const response = await axios.get(`${API_BASE}/`, { withCredentials: true });
            setHomeTasks(response.data.tasks || []);
        } catch (err) {
            console.error("Error fetching home tasks:", err);
        }
    }, []);

    // Lifecycle: Fetch data on mount or user change
    useEffect(() => {
        getAllHomeTasks(); // Home tasks sabko dikhenge

        if (user) {
            getPersonalTasks();
        } else {
            setTask([]); // Logout par personal tasks clear
        }
    }, [user, getAllHomeTasks, getPersonalTasks]);

    // 3. Create Task
    async function createTask(taskData) {
        try {
            const response = await axios.post(`${API_BASE}/create-task`, taskData, { withCredentials: true });
            const newTask = response.data.task;
            
            // Sync both states
            setTask((prev) => [...prev, newTask]);
            setHomeTasks((prev) => [...prev, newTask]);
            return { success: true };
        } catch (err) {
            console.error("Error Creating Task:", err);
            return { success: false, error: err.message };
        }
    }

    // 4. Edit Task
    async function editTask(id, editData) {
        try {
            const response = await axios.put(`${API_BASE}/edit-task/${id}`, editData, { withCredentials: true });
            const updatedTask = response.data.task;

            // Sync Personal state
            setTask((prev) => prev.map((t) => (t._id === id ? updatedTask : t)));
            // Sync Home state
            setHomeTasks((prev) => prev.map((t) => (t._id === id ? updatedTask : t)));
            
            return { success: true };
        } catch (err) {
            console.error("Error updating task:", err);
            return { success: false };
        }
    }

    // 5. Delete Task
    async function deleteTask(id) {
        try {
            await axios.delete(`${API_BASE}/delete-task/${id}`, { withCredentials: true });
            
            // Remove from both states
            setTask((prev) => prev.filter((t) => t._id !== id));
            setHomeTasks((prev) => prev.filter((t) => t._id !== id));
            
            return { success: true };
        } catch (err) {
            console.error("Error deleting task:", err);
            return { success: false };
        }
    }

    // --- Search Logic ---
    const filteredHomeTasks = homeTasks.filter((t) =>
        t.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredPersonalTasks = task.filter((t) =>
        t.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <TaskContext.Provider
            value={{ 
                task: filteredPersonalTasks, // Filtered personal tasks for Profile
                homeTasks: filteredHomeTasks, // Filtered global tasks for Home
                setTask, 
                createTask, 
                editTask, 
                deleteTask, 
                searchTerm, 
                setSearchTerm,
                getAllHomeTasks,
                getPersonalTasks
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export default TaskProvider;
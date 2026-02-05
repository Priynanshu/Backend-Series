import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { TaskContext } from "../context/TaskProvider";

const TaskList = () => {
    const {taskData, setTaskData, deleteTaskFromServer} = useContext(TaskContext)
    const [search, setSearch] = useState('')
    const [searchBox, setSearchBox] = useState("all")


    const filteredTask = taskData.filter((t) => {
        const matchSearch = t.title.toLowerCase().includes(search.toLowerCase())

        const matchPriority = searchBox === "all" ? true : t.priority === searchBox;
        return matchSearch && matchPriority
    })
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">📝 Task Manager</h1>
                    <Link
                        to="/add"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                        ➕ Add Task
                    </Link>
                </div>


                {/* Search & Filter */}
                <div className="flex gap-4 mb-6">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                        }}
                        placeholder="Search by name or email..."
                        className="flex-1 border px-4 py-2 rounded-lg"
                    />

                    <select
                        value={searchBox}
                        onChange={(e) => setSearchBox(e.target.value)}
                        className="border border-gray-300 bg-white px-4 py-2 rounded-lg
             focus:outline-none focus:ring-2 focus:ring-blue-500
             cursor-pointer text-gray-700"
                    >
                        <option value="all">All Tasks</option>
                        <option value="high">🔴 High Priority</option>
                        <option value="medium">🟡 Medium Priority</option>
                        <option value="low">🟢 Low Priority</option>
                    </select>
                </div>

                {/* Task List */}
                <div className="bg-white rounded-xl shadow">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-3 text-left">Title</th>
                                <th className="px-4 py-3 text-left">Description</th>
                                <th className="px-4 py-3 text-left">Priority</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredTask.map((elem, index) => (
                                <tr key={index} className="border-t">
                                    <td className="px-4 py-3">{elem.title}</td>
                                    <td className="px-4 py-3">{elem.description}</td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-3 py-1 text-xs font-semibold rounded-full
                                                    ${elem.priority === "high"
                                                    ? "bg-red-100 text-red-700"
                                                    : elem.priority === "medium"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-green-100 text-green-700"
                                                }`}
                                        >
                                            {elem.priority.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 text-xs rounded ${elem.status === "completed" ? "text-green-300 bg-green-600" : "text-red-300 bg-red-600"}`}>
                                            {elem.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right space-x-2">
                                        <Link to={`/edit/${elem._id}`}>Edit</Link>

                                        <button
                                            onClick={() => deleteTaskFromServer(elem._id)}
                                            className="text-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredTask.length === 0 && (
                        <p className="text-center text-gray-500 py-4">
                            No tasks found
                        </p>
                    )}
                </div>

            </div>
        </div>
    );
};

export default TaskList;

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TaskContext } from "../context/TaskProvider";

const AddTask = () => {
  const { addTaskToServer } = useContext(TaskContext);
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "medium", 
    status: "pending",
  });

  const submit = () => {
    if (!task.title.trim() || !task.description.trim()) return;

    addTaskToServer(task); // ✅ correct
    navigate("/");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          ➕ Add New Task
        </h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Task Title
          </label>
          <input
            type="text"
            onChange={(e) =>
              setTask({ ...task, title: e.target.value })
            }
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            rows="3"
            onChange={(e) =>
              setTask({ ...task, description: e.target.value })
            }
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Priority
          </label>
          <select
            onChange={(e) =>
              setTask({ ...task, priority: e.target.value })
            }
            className="w-full border px-3 py-2 rounded-lg"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Status */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Status
          </label>
          <select
            onChange={(e) =>
              setTask({ ...task, status: e.target.value })
            }
            className="w-full border px-3 py-2 rounded-lg"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Link to="/" className="px-4 py-2 border rounded-lg">
            Cancel
          </Link>
          <button
            onClick={submit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Save Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;

import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TaskContext } from "../context/TaskProvider";

const EditTask = () => {
  const { taskData, updateTaskOnServer } = useContext(TaskContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (taskData.length > 0) {
      const selectedTask = taskData.find(t => t._id === id);
      setTask(selectedTask);
      setLoading(false);
    }
  }, [taskData, id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-lg">
        Loading task...
      </div>
    );
  }

  if (!task) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        Task not found
      </div>
    );
  }

  const submit = () => {
    if (!task.title.trim() || !task.description.trim()) return;
    updateTaskOnServer(id, task);
    navigate("/");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-4 text-center">✏️ Edit Task</h2>

        <input
          value={task.title}
          onChange={e => setTask({ ...task, title: e.target.value })}
          className="w-full border px-3 py-2 rounded-lg mb-3"
        />

        <textarea
          value={task.description}
          onChange={e => setTask({ ...task, description: e.target.value })}
          className="w-full border px-3 py-2 rounded-lg mb-3"
        />

        <select
          value={task.status}
          onChange={e => setTask({ ...task, status: e.target.value })}
          className="w-full border px-3 py-2 rounded-lg mb-4"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={task.priority}
          onChange={e => setTask({ ...task, priority: e.target.value })}
          className="w-full border px-3 py-2 rounded-lg mb-4"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <div className="flex justify-end gap-3">
          <Link to="/" className="px-4 py-2 border rounded-lg">Cancel</Link>
          <button
            onClick={submit}
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            Update Task
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditTask;

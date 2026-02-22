import React, { useContext } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { Link, useActionData, useNavigate } from 'react-router-dom';
import { TaskContext } from '../context/TaskProvider';
import { handleSuccess } from '../utils/utilsToast';
import useAuthAction from '../hooks/useAuthAction';
import { ToastContainer } from 'react-toastify';

const CreateTask = () => {
  const fileRef = useRef(null);
  const navigate = useNavigate()
  const protect = useAuthAction()
  const { createTask } = useContext(TaskContext)
  const [image, setImage] = useState(null)
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    date: "",
    priority: "Low",
    assign: "",
  })

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  protect(async () => {
    try {
      handleSuccess("Task Created Successfully");
      const formData = new FormData();

      formData.append("title", taskData.title);
      formData.append("description", taskData.description);
      formData.append("date", taskData.date);
      formData.append("priority", taskData.priority);
      formData.append("assign", taskData.assign);

      if (image) {
        formData.append("coverImage", image);
      }

      await createTask(formData);

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  });
};

  return (
    <div>
      <div className=" inset-0 z-50 flex items-center justify-center bg-[#030712]/80 backdrop-blur-sm p-4">
      {/* Modal Container */}
      <div className="bg-[#111827] w-full max-w-150 rounded-xl border border-[#1f2937] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#1f2937] flex justify-between items-start">
          <div>
            <h2 className="text-white text-lg font-semibold">Create New Task</h2>
            <p className="text-[#9ca3af] text-sm mt-1">Fill in the details below to add a new task to your board.</p>
          </div>
          <Link to="/" className="text-[#9ca3af] hover:text-white transition-colors">
            <i className="fas fa-times text-lg"></i>
          </Link>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Task Title */}
            <div>
              <label className="block text-sm font-medium text-[#f3f4f6] mb-2">
                Task Title <span className="text-[#ef4444]">*</span>
              </label>
              <input
                type="text"
                value={taskData.title}
                onChange={(e) => {
                  setTaskData({ ...taskData, title: e.target.value })
                }}
                placeholder="e.g. Redesign Homepage Hero Section"
                className="w-full bg-[#0f172a] border border-[#374151] rounded-lg py-2.5 px-4 text-white text-sm outline-none focus:border-[#3b82f6] transition-all"
              />
            </div>

            {/* Grid Row: Date & Priority */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#f3f4f6] mb-2">Due Date</label>
                <div className="relative">
                  <i className="far fa-calendar absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] text-sm"></i>
                  <input
                    type="text"
                    value={taskData.date}
                    onChange={(e) => {
                      setTaskData({ ...taskData, date: e.target.value })
                    }}
                    placeholder="Select date"
                    className="w-full bg-[#0f172a] border border-[#374151] rounded-lg py-2.5 pl-10 pr-4 text-white text-sm outline-none focus:border-[#3b82f6] transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#f3f4f6] mb-2">Priority Level</label>
                <div className="relative">
                  <i className="fas fa-flag absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] text-sm"></i>
                  <select
                    value={taskData.priority}
                    onChange={(e) => {
                      setTaskData({ ...taskData, priority: e.target.value })
                    }}
                    className="w-full bg-[#0f172a] border border-[#374151] rounded-lg py-2.5 pl-10 pr-4 text-white text-sm outline-none focus:border-[#3b82f6] appearance-none transition-all cursor-pointer">
                    <option>Medium</option>
                    <option>High</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-[#f3f4f6] mb-2">Description</label>
              <textarea
                rows="3"
                value={taskData.description}
                onChange={(e) => {
                  setTaskData({ ...taskData, description: e.target.value })
                }}
                placeholder="Add detailed notes regarding this task..."
                className="w-full bg-[#0f172a] border border-[#374151] rounded-lg py-2.5 px-4 text-white text-sm outline-none focus:border-[#3b82f6] transition-all resize-none"
              ></textarea>
            </div>

            {/* Assignees */}
            <div>
              <label className="block text-sm font-medium text-[#f3f4f6] mb-2">Assign To</label>
              <div className="relative">
                <input
                  type="text"
                  value={taskData.assign}
                  onChange={(e) => {
                    setTaskData({ ...taskData, assign: e.target.value })
                  }}
                  placeholder="Select date"
                  className="w-full bg-[#0f172a] border border-[#374151] rounded-lg py-2.5 pl-10 pr-4 text-white text-sm outline-none focus:border-[#3b82f6] transition-all"
                />
              </div>
            </div>

            {/* Upload Area */}
            <div
              onClick={() => fileRef.current.click()}
              className="border border-dashed border-[#374151] rounded-lg p-4 text-center cursor-pointer hover:border-[#3b82f6] transition-colors group">
              <input
                type="file"
                ref={fileRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="mx-auto h-24 object-cover rounded-md"
                />
              ) : (
                <>
                  <i className="fas fa-cloud-upload-alt text-[#9ca3af] group-hover:text-[#3b82f6] mb-1"></i>
                  <div className="text-[0.75rem] text-[#9ca3af]">
                    Add Attachment
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-[#111827] border-t border-[#1f2937] flex justify-end gap-3">
              <Link to="/"
                className="px-5 py-2 rounded-lg bg-[#374151] hover:bg-[#4b5563] text-white text-sm font-medium transition-all"
              >
                Cancel
              </Link>
              <button type='submit' className="px-5 py-2 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-medium flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20">
                <i className="fas fa-check text-xs"></i> Save Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <ToastContainer />
    </div>
  );
};

export default CreateTask;
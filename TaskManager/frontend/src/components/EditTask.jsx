import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TaskContext } from '../context/TaskProvider';
import { useEffect } from 'react';
import {  handleSuccess } from '../utils/utilsToast';
import {ToastContainer} from "react-toastify"
import useAuthAction from '../hooks/useAuthAction';

const EditTask = () => {
    const { id } = useParams();
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const protect = useAuthAction()

  const { task = [], editTask } = useContext(TaskContext); // default empty array

  const [image, setImage] = useState(null);

  const [editData, setEditData] = useState({
    title: "",
    description: "",
    date: "",
    status: "",
    priority: "",
    assign: "",
  });

  // ----------------------------
  // Load Single Task Data
  // ----------------------------
  useEffect(() => {
    if (Array.isArray(task) && task.length > 0) {
      const singleTask = task.find((t) => t._id === id);

      if (singleTask) {
        setEditData({
          title: singleTask.title || "",
          description: singleTask.description || "",
          date: singleTask.date || "",
          status: singleTask.status || "",
          priority: singleTask.priority || "",
          assign: singleTask.assign || "",
        });
      }
    }
  }, [task, id]);

  // ----------------------------
  // Handle Image Change
  // ----------------------------
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // ----------------------------
  // Submit Updated Task
  // ----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    protect(async ()=> {
      try {
      handleSuccess("Task Edited Successfully")
      const formData = new FormData();

      Object.keys(editData).forEach((key) => {
        formData.append(key, editData[key]);
      });

      if (image) {
        formData.append("coverImage", image);
      }

      await editTask(id, formData);
      setTimeout(()=> {
        navigate("/");
      }, 1000)
    } catch (err) {
      console.log(err);
    }
    })
  };

  return (
    <div>
      <div className="inset-0 z-50 flex items-center justify-center bg-[#030712]/85 backdrop-blur-sm p-4">
      {/* Modal Container */}
      <div className="bg-[#111827] w-full max-w-200 rounded-xl border border-[#1f2937] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

        {/* Header */}
        <div className="px-6 py-4 border-b border-[#1f2937] flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-[#1e3a8a] text-[#3b82f6] p-2 rounded-lg">
              <i className="fas fa-edit"></i>
            </div>
            <div>
              <h2 className="text-white text-base font-semibold">Edit Task</h2>
              <p className="text-[#9ca3af] text-[0.75rem]">Update task details and settings</p>
            </div>
          </div>
          <Link to="/" className="text-[#9ca3af] hover:text-white transition-colors">
            <i className="fas fa-times text-lg"></i>
          </Link>
        </div>

        {/* Modal Body */}
        <div className="flex flex-col md:flex-row">

          {/* Left Column (Main Details) */}
          <div className="flex-2 p-6 border-r border-[#1f2937]">
            <div className="space-y-5">
              <div>
                <label className="block text-[0.75rem] text-[#9ca3af] font-medium uppercase tracking-wider mb-2">Task Title</label>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e)=> {
                    setEditData({...editData, title: e.target.value})
                  }}
                  placeholder='Enter the title'
                  className="w-full bg-[#0f172a] border border-[#1f2937] rounded-lg py-2.5 px-4 text-white text-sm outline-none focus:border-[#3b82f6] transition-all"
                />
              </div>

              <div>
                <label className="block text-[0.75rem] text-[#9ca3af] font-medium uppercase tracking-wider mb-2">Description</label>
                <textarea
                  value={editData.description}
                  onChange={(e)=> {
                    setEditData({...editData, description: e.target.value})
                  }}
                  className="w-full bg-[#0f172a] border border-[#1f2937] rounded-lg py-2.5 px-4 text-white text-sm outline-none focus:border-[#3b82f6] transition-all h-30 resize-none"
                  placeholder='Enter the Details'
                ></textarea>
              </div>

            </div>
          </div>

          {/* Right Column (Settings) */}
          <div className="flex-1 p-6 bg-[#111827]">
            <div className="space-y-5">
              <div>
                <label className="block text-[0.75rem] text-[#9ca3af] font-medium uppercase tracking-wider mb-2">Status</label>
                <select 
                value={editData.status}
                  onChange={(e)=> {
                    setEditData({...editData, status: e.target.value})
                  }}
                className="w-full bg-[#0f172a] border border-[#1f2937] rounded-lg py-2 px-3 text-white text-sm outline-none cursor-pointer">
                  <option>Rejected</option>
                  <option>Completed</option>
                  <option>Pending</option>
                </select>
              </div>

              <div>
                <label className="block text-[0.75rem] text-[#9ca3af] font-medium uppercase tracking-wider mb-2">Priority</label>
                <select 
                value={editData.priority}
                  onChange={(e)=> {
                    setEditData({...editData, priority: e.target.value})
                  }}
                className="w-full bg-[#0f172a] border border-[#1f2937] rounded-lg py-2 px-3 text-white text-sm outline-none cursor-pointer">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

              <div>
                <label className="block text-[0.75rem] text-[#9ca3af] font-medium uppercase tracking-wider mb-2">Due Date</label>
                <input
                  type="text"
                  value={editData.date}
                  onChange={(e)=> {
                    setEditData({...editData, date: e.target.value})
                  }}
                  placeholder='Enter the date'
                  className="w-full bg-[#0f172a] border border-[#1f2937] rounded-lg py-2 px-3 text-white text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-[0.75rem] text-[#9ca3af] font-medium uppercase tracking-wider mb-2">Assign To</label>
                <input
                  type="text"
                  value={editData.assign}
                  onChange={(e)=> {
                    setEditData({...editData, assign: e.target.value})
                  }}
                  placeholder='Whose to assign'
                  className="w-full bg-[#0f172a] border border-[#1f2937] rounded-lg py-2 px-3 text-white text-sm outline-none"
                />
              </div>


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
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#1f2937] flex justify-between items-center bg-[#111827]">
          <button className="text-[#ef4444] text-sm font-medium flex items-center gap-2 hover:bg-[#ef4444]/10 px-3 py-1.5 rounded-lg transition-colors">
            <i className="far fa-trash-alt"></i> Delete Task
          </button>
          <div className="flex gap-3">
            <Link to="/" className="px-4 py-2 text-white text-sm font-medium hover:bg-[#1f2937] rounded-lg transition-colors">
              Cancel
            </Link>
            <button onClick={handleSubmit} className="px-4 py-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20">
              <i className="fas fa-save text-xs"></i> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
     <ToastContainer />
    </div>
  );
};

export default EditTask;
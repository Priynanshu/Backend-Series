import React, { useContext } from "react";
import TaskCard from "../components/TaskCard";
import { TaskContext } from "../context/TaskProvider";

const Home = () => {
  // ✅ 'task' ki jagah 'homeTasks' use karein jo sabhi users ka data laayega
  const { homeTasks, searchTerm } = useContext(TaskContext);

  // Search logic ab homeTasks par chalegi
  const filteredTasks = homeTasks.filter((t) =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Check homeTasks length */}
      {homeTasks?.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center py-20 text-center">
          <i className="fas fa-globe text-4xl text-gray-600 mb-4"></i>
          <h2 className="text-white text-xl font-semibold mb-2">
            No Public Tasks Available
          </h2>
          <p className="text-gray-400 text-sm">
            Be the first one to post a task! 🚀
          </p>
        </div>
      ) : (
        <>
          {/* Header change: 'Your Tasks' se 'Explore Tasks' ya 'Feed' */}
          <h1 className="text-2xl font-semibold mb-6">Explore All Tasks</h1>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.map((item) => (
              <TaskCard key={item._id} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
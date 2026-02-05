import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [taskData, setTaskData] = useState([]);

  // FETCH TASKS
  const fetchTasks = () => {
    axios
      .get("http://localhost:3000/todos")
      .then((res) => {
        setTaskData(res.data.todos); 
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ADD TASK
  const addTaskToServer = (task) => {
    axios
      .post("http://localhost:3000/todos", task)
      .then(() => {
        fetchTasks();
      })
      .catch((err) => console.error(err));
  };

  // DELETE TASK
  const deleteTaskFromServer = (id) => {
    axios
      .delete(`http://localhost:3000/todos/${id}`)
      .then(() => {
        fetchTasks();
      })
      .catch((err) => console.error(err));
  };

  const updateTaskOnServer = (id, updatedTask) => {
    axios
      .put(`http://localhost:3000/todos/${id}`, updatedTask)
      .then(fetchTasks)
      .catch(console.error);
  };

  return (
    <TaskContext.Provider
      value={{
        taskData,
        addTaskToServer,
        deleteTaskFromServer,
        updateTaskOnServer
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;

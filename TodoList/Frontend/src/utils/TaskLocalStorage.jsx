const defaultTasks = [
  {
    title: "Learn React",
    description: "Context API and LocalStorage basics",
    priority: "high",
    status: "pending",
  },
  {
    title: "Practice Tailwind",
    description: "Build responsive UI with Tailwind CSS",
    priority: "medium",
    status: "completed",
  },
  {
    title: "JavaScript Revision",
    description: "Closures, promises, async/await",
    priority: "high",
    status: "pending",
  },
  {
    title: "DSA Practice",
    description: "Arrays and two pointer problems",
    priority: "high",
    status: "pending",
  },
  {
    title: "Git & GitHub",
    description: "Branching, merge, pull request flow",
    priority: "medium",
    status: "completed",
  },
  {
    title: "Build Todo App",
    description: "CRUD operations with React",
    priority: "low",
    status: "pending",
  },
  {
    title: "Learn React Router",
    description: "Routing, params, navigation",
    priority: "medium",
    status: "completed",
  },
  {
    title: "Explore Redux",
    description: "Redux Toolkit fundamentals",
    priority: "high",
    status: "pending",
  },
  {
    title: "UI Improvement",
    description: "Better UX for forms and tables",
    priority: "low",
    status: "completed",
  },
  {
    title: "Backend Basics",
    description: "Node.js, Express intro",
    priority: "medium",
    status: "pending",
  },
];

export const getTaskFromLS = () => {
   const data = localStorage.getItem("task")
   if(!data) {
    localStorage.setItem("task", JSON.stringify(defaultTasks))
    return defaultTasks;
   }

   try {
    return JSON.parse(data);
   } catch (e) {
    console.error("Invalid JSON in localStorage, resetting...");
    localStorage.setItem("task", JSON.stringify(defaultTasks))
    return defaultTasks;
   }
}

export const setTaskFromLS = (task) => {
    localStorage.setItem("task", JSON.stringify(task))
}
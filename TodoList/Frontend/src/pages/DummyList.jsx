import axios from 'axios'
import React, { useEffect, useState } from 'react'

const DummyList = () => {
    const [tasks, setTaskData] = useState([
        {
            title: "Task 1",
            description: "Description for Task 1",
        },
        {
            title: "Task 2",
            description: "Description for Task 2",
        },
        {
            title: "Task 3",
            description: "Description for Task 3",
        }
    ])

    function fetchTasks() {
        axios.get("http://localhost:3000/todos")
            .then((res) => {
                setTaskData(res.data.todos);
            })
            .catch((err) => {
                console.error("Error fetching tasks:", err);
            });
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    return (
        <div>
            {tasks.map((task, index) => (
                <div key={index}>
                    <h1>{task.title}</h1>
                    <p>{task.description}</p>
                </div>
            ))}
        </div>
    )
}

export default DummyList
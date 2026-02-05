import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TaskList from './pages/TaskList'
import AddTask from './pages/AddTask'
import EditTask from './pages/EditTask'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<TaskList />} />
      <Route path="/add" element={<AddTask />} />
      <Route path="/edit/:id" element={<EditTask />} />
    </Routes>
  )
}

export default App
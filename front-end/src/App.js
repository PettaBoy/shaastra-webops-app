import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskMain from './pages/task_main';
import TaskCreate from './pages/task_create';
import './App.css';
import TaskUpdate from './pages/task_update';

function App() {

  return (
    <div className="App">
      <h1>To-do list</h1>
      <Router>
        <Routes>
          <Route path="/" element={<TaskMain/>} />
          <Route path="/task_create" element={<TaskCreate/>} />
          <Route path="/task_update/:id" element={<TaskUpdate/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
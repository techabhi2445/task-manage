import React from 'react';
import {useNavigate} from 'react-router-dom';
import '../../src/App.css';
import toast,{Toaster} from 'react-hot-toast';

export default function AddTask() {
  const { useState } = React;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://task-manage-1-uawb.onrender.com/api/addtask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    });
    const data = await response.json();
    if (data.success) {
      toast.success('Task added successfully');
       setTimeout(() => {
      navigate('/alllist');
    }, 500); 
    } else {
      toast.error('Fill all the fields properly');
    }
  
  };
  
  
  return (
    <div className="add-task-container">
      <Toaster position="top-center" reverseOrder={false} transitionDuration={200} />


      <div className="add-task-form">
      <h1>Add Task Page</h1>
        <input type="text" placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Task Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        <button onClick={handleSubmit}>Add Task</button>
      </div>
    </div>
  )
}

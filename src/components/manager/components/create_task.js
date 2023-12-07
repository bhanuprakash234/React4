import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateTask() {
  const { sid } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [task, setTask] = useState('');
  const [msg, setMsg] = useState('');

  const [details, setDetails] = useState('');
  const [days, setDays] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const uid = localStorage.getItem('id');
    const mid = parseInt(uid, 10) + 1;
    // Fetch the list of employees from your API
    axios.get('http://localhost:5050/employee/manager/'+mid)
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => console.error('Error in fetching employees:', error));
  }, []);

  const handleCreateTask = () => {
    const sprintId = sid.split('=')[1];

    // Make sure to validate that all required fields are filled
    if (!title || !days || !employeeId) {
      alert('Please fill in all fields');
      return;
    }
    const taskId = `${sprintId}/${employeeId}`;
    let taskObj={
      "title":title,
      "details":details,
      "noOfDays":days
  }
  axios.post(`http://localhost:5050/task/add/${taskId}`, taskObj)
  .then(response=>{
      setTask(response.data)
      navigate(-1);
  })
  .catch(function(error){
      setMsg("Issue in processing in signup")
  });


    
  };

  return (
    <div className="container mt-5">
      <h1 className="text-primary">Create Task</h1>

      <div className="form-group mt-4">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="days">Number of Days:</label>
        <input
          type="text"
          id="days"
          className="form-control"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="details">Enter Details:</label>
        <input
          type="text"
          id="details"
          className="form-control"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="employee">Select Employee:</label>
        <select
          id="employee"
          className="form-control"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        >
          <option value="">Select Employee</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.name}
            </option>
          ))}
        </select>
      </div>
      <br />

      <button className="btn btn-primary" onClick={handleCreateTask}>
        Create Task
      </button>
    </div>
  );
}

export default CreateTask;
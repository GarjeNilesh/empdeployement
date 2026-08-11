import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from './EmployeeService';

const EditWorker = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [worker, setWorker] = useState({ name: '', email: '', rollno: '' });
  const [message, setMessage] = useState('');

  // Fetch worker data when component mounts
 useEffect(() => {
  EmployeeService.getWorkerById(id)
    .then((res) => setWorker(res.data))
    .catch((err) => console.error('Error fetching worker:', err));
}, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorker({ ...worker, [name]: value });
  };

  // Update worker on form submission
 const updateWorker = (e) => {
  e.preventDefault();

  EmployeeService.updateWorker(id, worker)
    .then(() => {
      // Show success message
      setMessage('Worker updated successfully!');

      // Navigate to home after 1.5 seconds
      setTimeout(() => {
        navigate('/Home'); // Replace '/Home' with your home page route
      }, 1500);
    })
    .catch((err) => {
      console.error('Error updating worker:', err);
      setMessage('Error updating worker.');
    });
};


  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Edit Worker</h1>

      {message && <p className="text-center text-success">{message}</p>}

      <form onSubmit={updateWorker} className="p-4 border rounded shadow-sm bg-light">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={worker.name}
            onChange={handleChange}
            placeholder="Enter name"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={worker.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="rollno" className="form-label">Roll Number</label>
          <input
            type="text"
            className="form-control"
            id="rollno"
            name="rollno"
            value={worker.rollno}
            onChange={handleChange}
            placeholder="Enter roll number"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Update Worker</button>
      </form>
    </div>
  );
};

export default EditWorker;

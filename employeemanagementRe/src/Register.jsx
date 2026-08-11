import React, { useState } from 'react';
import EmployeeService from './EmployeeService';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

function Register() {

    const { login } = useAuth();
    const navigate = useNavigate();

    const [employee,setEmployee]=useState({
        username:'',
        email:'',
        password:'',
    });

    const [msg,setMessage]=useState();
    
    const handleChange=(e)=>{
        const{name,value}=e.target;
        setEmployee({
            ...employee,[name]:value,
        })
    }
    
    const handleSubmit=async (e)=>{
      e.preventDefault();
      
      try {
        const response = await EmployeeService.saveEmployee(employee);
        console.log("Employee Saved ",response.data);
        setMessage("Inserted Data Successfully");
        // Auto-login and redirect to Home
        login();
        navigate('/Home');
      } catch (error) {
        console.log("Something Wrong ",error);
        setMessage('Registration failed. Try again.');
      }
    };
    

  return (
    <div className="main-content">
      <div className="card-centered">
        <h2 className="centered-title">Register</h2>
        {msg && <div className="alert alert-success">{msg}</div>}
        <form onSubmit={handleSubmit} className="w-card">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" name="username" id="username" value={employee.username} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" name="email" id="email" value={employee.email} onChange={handleChange}  />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" id="password" value={employee.password} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;

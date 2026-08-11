import React, { useState } from 'react';
import EmployeeService from './EmployeeService';

function AddWorker() {
    // Update state to match Worker properties
    const [worker, setWorker] = useState({
        name: '',
        email: '',
        rollno: '',
        field: ''
    });

    const [msg, setMessage] = useState();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWorker({
            ...worker,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Call saveWorker instead of saveEmployee
        EmployeeService.saveWorker(worker)
            .then(response => {
                console.log("Worker Saved ", response.data);
                setMessage("Inserted Data Successfully");
            })
            .catch(error => {
                console.log("Something Wrong ", error);
            });
    };

    return (
        <div className="container">
            <h2>Register Worker</h2>
            {msg && <div className="alert alert-success">{msg}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" id="name" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" id="email" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="rollno" className="form-label">Roll No</label>
                    <input type="number" className="form-control" name="rollno" id="rollno" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="field" className="form-label">Field</label>
                    <input type="text" className="form-control" name="field" id="field" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
}

export default AddWorker;

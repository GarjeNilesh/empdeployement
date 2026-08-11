import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import EmployeeService from './EmployeeService';

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await EmployeeService.login({ email, password });
     
            if (response.status === 200) {
                login(); // This updates isAuthenticated to true
                  navigate('/Home'); // Redirect to Home page
            } else {
                setErrorMessage('Invalid credentials. Please try again.'); // Unexpected response status
            }
        } catch (error) {
            setErrorMessage('Invalid credentials. Please try again.');
            console.error('Login error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="main-content">
          <div className="card-centered">
            <h2 className="centered-title">Login</h2>
            <form onSubmit={handleLogin} className="w-card">
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
            </form>
          </div>
        </div>
    );
};

export default Login;

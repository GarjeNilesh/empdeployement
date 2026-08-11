import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { useAuth } from './AuthContext';
import AddWorker from './AddWorker';
import EditWorker from './EditWorker';
import Home from './Home';
import Login from './Login';
import Navbar from './NavBar';
import Register from './Register';

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/Login" />;
}

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/' element={<Navigate to="/Login" replace />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/Register' element={<Register />} />
                <Route path='/AddWorker' element={<ProtectedRoute><AddWorker /></ProtectedRoute>} />
                <Route path='/Home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path='/EditWorker/:id' element={<ProtectedRoute><EditWorker /></ProtectedRoute>} />
                <Route path='*' element={<Navigate to="/Login" replace />} />
             </Routes>
        </>
    );
}

export default App;

import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import EmployeeService from './EmployeeService'; 

const Home = () => { 
    const [workers, setWorkers] = useState([]); 
    const navigate = useNavigate(); 
    const [message, setMessage] = useState(''); 

    useEffect(() => { 
        // Fetch all workers when the component mounts 
        EmployeeService.getAllWorkers()
            .then((response) => { 
                console.log(response.data); // Log the API response to check the data
                setWorkers(response.data); 
            }) 
            .catch((error) => { 
                console.error('Error fetching workers:', error); 
            }); 
    }, []); 

    const handleEdit = (id) => { 
        navigate(`/editWorker/${id}`); 
    }; 
   
    const handleDelete = (id) => {
    EmployeeService.deleteWorker(id)
        .then((response) => {
            console.log('Delete response:', response);
            setWorkers(workers.filter((worker) => worker.id !== id));
            setMessage("Worker deleted successfully.");
        })
        .catch((error) => {
            console.error('Error deleting worker:', error);
            setMessage('Error deleting worker');
        });
};

    

    return ( 
        <div className="container mt-5"> 
            <h1 className="text-center mb-4">Worker List</h1> 
            {message && <p className="text-center text-success">{message}</p>} 
            <table className="table table-striped table-bordered"> 
                <thead className="thead-dark"> 
                    <tr> 
                        <th>ID</th> 
                        <th>Name</th> 
                        <th>Email</th> 
                        <th>Roll No</th> 
                        <th>Field</th> 
                        <th>Actions</th> 
                    </tr> 
                </thead> 
                <tbody> 
                    {workers.length > 0 ? ( 
                        workers.map((worker) => ( 
                            <tr key={worker.id}> 
                                <td>{worker.id}</td> 
                                <td>{worker.name}</td> 
                                <td>{worker.email}</td> 
                                <td>{worker.rollno}</td> 
                                <td>{worker.field}</td> 
                                <td> 
                                    <button 
                                        className="btn btn-primary me-2" 
                                        onClick={() => handleEdit(worker.id)} 
                                    > 
                                        Edit 
                                    </button> 
                                    <button 
                                        className="btn btn-danger" 
                                        onClick={() => handleDelete(worker.id)} 
                                    > 
                                        Delete 
                                    </button> 
                                </td> 
                            </tr> 
                        )) 
                    ) : ( 
                        <tr> 
                            <td colSpan="6" className="text-center">No workers available</td> 
                        </tr> 
                    )} 
                </tbody> 
            </table> 
        </div> 
    ); 
}; 

export default Home;

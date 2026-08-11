import axios from "axios";

const API_URL = "http://localhost:8080";

class EmployeeService {
  saveEmployee(employee) {
    return axios.post(`${API_URL}/saveEmployee`, employee);
  }
  
  saveWorker(worker) {
    return axios.post(`${API_URL}/saveWorker`, worker);
  }
  
  login(loginDetails) {
    return axios.post(`${API_URL}/login`, loginDetails);
  }

  getAllWorkers() {
    return axios.get(`${API_URL}/workers`);
  }

  deleteWorker(workerId) {
    return axios.delete(`${API_URL}/workers/${workerId}`);
  }
  
  // ✅ Fetch worker by id (for pre-fill form)
  getWorkerById(id) {
    return axios.get(`${API_URL}/workers/${id}`);
  }

  // ✅ Update worker
  updateWorker(id, worker) {
    return axios.put(`${API_URL}/${id}`, worker);
  }
}

// Export the instance
export default new EmployeeService();

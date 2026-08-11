package com.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Model.Employee;
import com.Model.Worker;
import com.Repository.EmployeeRepository;
import com.Repository.WorkerRepository;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository empRepo;

    @Autowired
    private WorkerRepository workerRepo;

    public Employee saveEmployee(Employee emp) {
        return empRepo.save(emp);
    }

    public boolean verifyEmployee(String email, String password) {
        List<Employee> employees = empRepo.findEmployeesByEmail(email);
        if (employees.isEmpty()) {
            System.out.println("❌ Employee not found with email: " + email);
            return false;
        }
        Employee employee = employees.get(0);
        if (!password.equals(employee.getPassword())) {
            System.out.println("⚠️ Incorrect password for email: " + email);
            return false;
        }
        System.out.println("✅ Employee verified successfully: " + email);
        return true;
    }

    public Worker saveWorker(Worker worker) {
        return workerRepo.save(worker);
    }

    public List<Worker> findAllWorkers() {
        List<Worker> workers = workerRepo.findAll();
        if (workers.isEmpty()) {
            System.out.println("⚠️ No workers found in the database.");
        } else {
            System.out.println("✅ Found " + workers.size() + " workers.");
        }
        return workers;
    }

    public String deleteWorkerById(Integer id) {
        Optional<Worker> worker = workerRepo.findById(id);
        if (worker.isPresent()) {
            workerRepo.deleteById(id);          
            return "Worker deleted successfully";
        } else {
           
            return "Worker not found with ID: " + id;
        }
    }
    
    public Worker findWorkerById(int id) {
        return workerRepo.findById(id).orElse(null); // Return null if not found
    }
    
    
    public String updateWorkerById(int id, Worker newData) {
        
        Worker existingWorker = workerRepo.findById(id).orElse(null);
        
        if (existingWorker == null) {
            return "No worker found for this id";
        }

        if ((newData.getName() == null || newData.getName().isEmpty()) &&
            (newData.getEmail() == null || newData.getEmail().isEmpty()) &&
            (newData.getRollno() == null || newData.getRollno()==0)) {
            return "No new data found for updation";
        }


        if (newData.getName() != null && !newData.getName().isEmpty()) {
            existingWorker.setName(newData.getName());
        }

        if (newData.getEmail() != null && !newData.getEmail().isEmpty()) {
            existingWorker.setEmail(newData.getEmail());
        }

        if (newData.getRollno() != null ) {
            existingWorker.setRollno(newData.getRollno());
        }

        workerRepo.save(existingWorker);

        return "Worker updated successfully";
    }

}


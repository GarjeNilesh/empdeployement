package com.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.Model.Employee;
import com.Model.Worker;
import com.Service.EmployeeService;


@CrossOrigin(origins = "https://empdeployement-git-main-garjenileshs-projects.vercel.app")
@RestController
public class EmployeeController {

    @Autowired
    EmployeeService servImp;
   
    
    @PutMapping("/{id}")
    public ResponseEntity<String> UpdateWorker(@PathVariable int id, @RequestBody Worker newData) {
        String result = servImp.updateWorkerById(id, newData);
        if (result.contains("No worker found")) {
        	return ResponseEntity.status(404).body(result);

        }
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/workers/{id}")
    public ResponseEntity<Worker> getWorkerById(@PathVariable int id) {
        Worker worker = servImp.findWorkerById(id);
        if (worker == null) {
            return ResponseEntity.status(404).build();
        }
        return ResponseEntity.ok(worker);
    }

    
      @PostMapping("/saveEmployee")
    public ResponseEntity<?> saveEmployee(@RequestBody Employee emp) {
        return new ResponseEntity<>(servImp.saveEmployee(emp), HttpStatus.OK);
    }

    @PostMapping("/saveWorker")
    public ResponseEntity<?> saveWorker(@RequestBody Worker worker) {
        return new ResponseEntity<>(servImp.saveWorker(worker), HttpStatus.OK);
    }

    @GetMapping("/workers")
    public ResponseEntity<List<Worker>> getAllWorkers() {
        List<Worker> workers = servImp.findAllWorkers();
        return new ResponseEntity<>(workers, HttpStatus.OK);
    }

    @DeleteMapping("/workers/{id}")
    public ResponseEntity<?> deleteWorker(@PathVariable Integer id) {
        String result = servImp.deleteWorkerById(id);
        if (result.equals("Worker deleted successfully")) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> loginEmployee(@RequestBody Employee emp) {
        // Check if the email and password match
        boolean isValidUser = servImp.verifyEmployee(emp.getEmail(), emp.getPassword());
        
        if (isValidUser) {
            return ResponseEntity.ok().body("Login Successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
        }
    }
    
 
}

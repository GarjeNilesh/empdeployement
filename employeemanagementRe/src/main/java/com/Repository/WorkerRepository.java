package com.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Model.Worker;


public interface WorkerRepository extends JpaRepository<Worker, Integer> {


    // You can add methods here as needed, e.g., to find by email
}

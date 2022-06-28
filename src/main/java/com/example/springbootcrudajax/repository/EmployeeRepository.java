package com.example.springbootcrudajax.repository;

import com.example.springbootcrudajax.dao.entity.EmployeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<EmployeeEntity,Long> {
}

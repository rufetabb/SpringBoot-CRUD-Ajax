package com.example.springbootcrudajax.service;

import com.example.springbootcrudajax.dao.entity.EmployeeEntity;
import com.example.springbootcrudajax.repository.EmployeeRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {
    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }


    public List<EmployeeEntity> allEmployee() {
        var employeeList = employeeRepository.findAll();
        return employeeList;
    }

    public EmployeeEntity createEmployee(EmployeeEntity employeeEntity) {
        var employee = employeeRepository.save(employeeEntity);

        return employee;
    }

    public EmployeeEntity updateEmployeeById(Long id, EmployeeEntity employeeEntity) {
        var employeeExists = employeeRepository.existsById(id);

        if (!employeeExists) return createEmployee(employeeEntity);
        var employee = employeeRepository.findById(id).get();
        employee.setName(employeeEntity.getName());
        employee.setSurname(employeeEntity.getSurname());
        employee.setAge(employeeEntity.getAge());
        employeeRepository.save(employee);
        return employee;

    }

    public void deleteEmployeeById(Long id) {
        var employeeExists = employeeRepository.existsById(id);
        if (!employeeExists) new RuntimeException("employee not found");
        employeeRepository.deleteById(id);

    }
}

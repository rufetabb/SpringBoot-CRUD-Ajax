package com.example.springbootcrudajax.controller;

import com.example.springbootcrudajax.dao.entity.EmployeeEntity;
import com.example.springbootcrudajax.service.EmployeeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmployeeController {
    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/all")
    public List<EmployeeEntity> getAllEmployee() {
        return employeeService.allEmployee();
    }

    @PostMapping("/creat")
    public EmployeeEntity creatEmployee(@RequestBody EmployeeEntity employee) {
        var employeeDto = employeeService.createEmployee(employee);

        return employeeDto;
    }

    @PutMapping("/update/{id}")
    public EmployeeEntity updateEmployee(@PathVariable Long id, @RequestBody EmployeeEntity employee) {
        var employeeDto = employeeService.updateEmployeeById(id, employee);
        return employeeDto;
    }

    @DeleteMapping("/delete/{id}")
    public void deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployeeById(id);

    }
}

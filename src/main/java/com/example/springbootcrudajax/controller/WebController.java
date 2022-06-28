package com.example.springbootcrudajax.controller;

import com.example.springbootcrudajax.service.EmployeeService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping("/web")
public class WebController {
    private final EmployeeService employeeService;

    public WebController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/show")
    public String addEmployee() {
        return "index";
    }


}

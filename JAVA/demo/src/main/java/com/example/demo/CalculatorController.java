package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CalculatorController {

	@GetMapping(path = "/calculator")
	public String calculate(@RequestParam(name = "op1") String op1,
			@RequestParam(name = "op2") String op2,
			@RequestParam(name = "op") String op) {

		System.out.println("WHAT I GET FROM BROWSER: " + op1 + ", " + op2 + ", " + op);


		return "Hello world ";
	}
}

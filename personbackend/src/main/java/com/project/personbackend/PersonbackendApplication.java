package com.project.personbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
public class PersonbackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(PersonbackendApplication.class, args);
	}

}

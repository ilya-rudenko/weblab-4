package com.ilyarudenko.lab4_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class Lab4BackendApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(Lab4BackendApplication.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder app) {
        return app.sources(Lab4BackendApplication.class);
    }
}

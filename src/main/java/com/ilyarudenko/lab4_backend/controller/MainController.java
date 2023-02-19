package com.ilyarudenko.lab4_backend.controller;

import com.ilyarudenko.lab4_backend.model.dto.EntryDto;
import com.ilyarudenko.lab4_backend.model.dto.UserDto;
import com.ilyarudenko.lab4_backend.model.entity.Entry;
import com.ilyarudenko.lab4_backend.model.service.EntryManager;
import com.ilyarudenko.lab4_backend.model.service.Response;
import com.ilyarudenko.lab4_backend.model.service.UserManager;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MainController {

    private final EntryManager entryManager;
    private final UserManager userManager;

    public MainController(EntryManager entryManager, UserManager userManager) {
        this.entryManager = entryManager;
        this.userManager = userManager;
    }

    @GetMapping("/ping")
    public String ping(){
        return "pong";
    }

    @PostMapping("/login")
    public Response login(@RequestBody UserDto user){
        return userManager.loginUser(user);
    }

    @PostMapping("/register")
    public Response register(@RequestBody UserDto user){
        return userManager.registerUser(user);
    }

    @PostMapping
    public Response addEntry(@RequestBody EntryDto newEntry){
        return entryManager.addEntry(newEntry);
    }

    @PostMapping("/entries")
    public Response getEntries(@RequestBody UserDto user) {
        return entryManager.getEntries(user);
    }

    @DeleteMapping
    public Response deleteAll(@RequestBody UserDto user){
        return entryManager.deleteAll(user);
    }
}

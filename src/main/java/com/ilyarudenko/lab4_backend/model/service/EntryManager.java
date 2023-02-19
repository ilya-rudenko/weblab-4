package com.ilyarudenko.lab4_backend.model.service;

import com.ilyarudenko.lab4_backend.model.dto.EntryDto;
import com.ilyarudenko.lab4_backend.model.dto.UserDto;
import com.ilyarudenko.lab4_backend.model.entity.Entry;
import com.ilyarudenko.lab4_backend.model.repo.EntryRepository;
import com.ilyarudenko.lab4_backend.model.repo.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Service
public class EntryManager {

    private final EntryRepository entryRepository;

    private final UserManager userManager;

    private final EntryChecker entryChecker;

    public EntryManager(EntryRepository entryRepository, UserManager userManager, EntryChecker entryChecker) {
        this.entryRepository = entryRepository;
        this.entryChecker = entryChecker;
        this.userManager = userManager;
    }

    public Response addEntry(EntryDto entry){

        Response res = new Response();

        if (userManager.checkCorrectUser(entry.getUsername(), entry.getPassword()) != UserCheckEnum.OK){
            res.setMessage("Something went wrong with authentication");
            res.setError(true);
            return res;
        }


        long startTime = System.nanoTime();

        Entry newEntry = new Entry(entry.getX(),entry.getY(),entry.getR());
        entryChecker.check(newEntry);

        long endTime = System.nanoTime();
        long scriptTime = (endTime - startTime); //1000000; // milliseconds
        newEntry.setExecutionTime(scriptTime);

        String date = LocalDateTime.now(ZoneOffset.UTC).format(DateTimeFormatter.ofPattern("HH:mm:ss dd/MM/yyyy")) + " UTC";
        newEntry.setDate(date);

        newEntry.setUsername(entry.getUsername());

        entryRepository.save(newEntry);

        res.setError(false);
        res.setEntry(newEntry);

        return res;
    }

    public Response getEntries(UserDto user){
        Response res = new Response();

        if (userManager.checkCorrectUser(user.getUsername(), user.getPassword()) != UserCheckEnum.OK){
            res.setMessage("Something went wrong with authentication");
            res.setError(true);
        }

        List<Entry> entries = entryRepository.findByUsername(user.getUsername());

        Collections.reverse(entries);

        res.setError(false);
        res.setEntries(entries);

        return res;
    }

    public Response deleteAll(UserDto user){
        Response res = new Response();

        if (userManager.checkCorrectUser(user.getUsername(), user.getPassword()) != UserCheckEnum.OK){
            res.setMessage("Something went wrong with authentication");
            res.setError(true);
        }

        entryRepository.removeByUsername(user.getUsername());

        res.setError(false);

        return res;
    }

}

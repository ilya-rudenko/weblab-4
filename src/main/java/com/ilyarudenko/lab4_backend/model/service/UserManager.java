package com.ilyarudenko.lab4_backend.model.service;

import com.ilyarudenko.lab4_backend.model.dto.UserDto;
import com.ilyarudenko.lab4_backend.model.entity.User;
import com.ilyarudenko.lab4_backend.model.repo.UserRepository;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.Arrays;
import java.util.Objects;
import java.util.Random;

@Service
public class UserManager {

    private final UserRepository userRepository;

    private MessageDigest digest;
    private final Random random = new SecureRandom();

    public UserManager(UserRepository userRepository) {
        this.userRepository = userRepository;

        try {
            digest = MessageDigest.getInstance("SHA-224");
        }
        catch (Exception e){
            System.out.println(e.getMessage());
        }
    }

    public Response registerUser(UserDto user) {
        Response res = new Response();
        res.setEntry(null);

        if (checkCorrectUser(user.getUsername(), user.getPassword()) != UserCheckEnum.USERNAME_NOT_EXISTS ) {
            res.setError(true);
            res.setMessage("This username already exists");
            return res;
        }

        User newUser = new User();

        newUser.setUsername(user.getUsername());

        byte[] salt = new byte[6];
        random.nextBytes(salt);
        newUser.setSalt(salt);

        newUser.setHashedPassword(getHash(user.getPassword(), salt));

        userRepository.save(newUser);

        res.setError(false);
        res.setMessage("OK");

        return res;
    }

    public Response loginUser(UserDto user) {
        Response res = new Response();
        res.setEntry(null);

        if (checkCorrectUser(user.getUsername(), user.getPassword()) == UserCheckEnum.USERNAME_NOT_EXISTS ) {
            res.setError(true);
            res.setMessage("This username not exists");
            return res;
        } else if (checkCorrectUser(user.getUsername(), user.getPassword()) == UserCheckEnum.PASSWORD_NOT_MATCHES ) {
            res.setError(true);
            res.setMessage("Wrong password");
            return res;
        } else {
            res.setError(false);
            res.setMessage("OK");
            return res;
        }
    }

    public UserCheckEnum checkCorrectUser(String username, String password) {
        User dbUser = userRepository.getUserByUsername(username);

        if (dbUser == null) return UserCheckEnum.USERNAME_NOT_EXISTS;

        if (!Arrays.equals(dbUser.getHashedPassword(), getHash(password, dbUser.getSalt()))) return UserCheckEnum.PASSWORD_NOT_MATCHES;

        return UserCheckEnum.OK;
    }

    private byte[] getHash(String password, byte[] salt) {
        digest.update("}aZy*}".getBytes(StandardCharsets.UTF_8));
        digest.update(Objects.requireNonNullElse(password, "null").getBytes(StandardCharsets.UTF_8));
        digest.update(salt);
        return digest.digest();
    }


}


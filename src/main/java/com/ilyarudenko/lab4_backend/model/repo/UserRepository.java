package com.ilyarudenko.lab4_backend.model.repo;

import com.ilyarudenko.lab4_backend.model.entity.User;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User getUserByUsername(String username);


}

package com.ilyarudenko.lab4_backend.model.repo;

import com.ilyarudenko.lab4_backend.model.entity.Entry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface EntryRepository extends JpaRepository<Entry, Long> {
        List<Entry> findByUsername(String username);

        @Transactional
        void removeByUsername(String username);
}

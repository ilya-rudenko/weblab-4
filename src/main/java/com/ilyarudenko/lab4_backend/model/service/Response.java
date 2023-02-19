package com.ilyarudenko.lab4_backend.model.service;

import com.ilyarudenko.lab4_backend.model.entity.Entry;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class Response {
    private boolean error;

    private String message;

    private Entry entry;

    private List<Entry> entries;
}

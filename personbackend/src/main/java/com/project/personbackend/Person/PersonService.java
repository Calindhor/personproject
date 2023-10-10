package com.project.personbackend.Person;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PersonService {
    private final PersonRepository personRepository;

    @Transactional(readOnly = true)
    public List<Person> getPeople() {
        return personRepository.findAll();
    }

    @Transactional
    public void addNewPerson(Person person) {
        personRepository.save(person);
    }
}
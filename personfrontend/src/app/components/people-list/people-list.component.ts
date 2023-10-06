import { Component } from '@angular/core';
import { Person } from '../../Person';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent {
  persons: Person[] = [];

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.personService.getPersons().subscribe((persons) => this.persons = persons);
  }
}

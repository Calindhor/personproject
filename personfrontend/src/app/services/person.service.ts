import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Person } from '../Person';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class PersonService {
  private apiUrl = 'http://localhost:8080/api/people'

  constructor(private http: HttpClient) { }

  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl);
  }

  addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.apiUrl, person, httpOptions);
  }
}
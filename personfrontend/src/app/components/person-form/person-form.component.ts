import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from '../../Person';
import { PersonService } from '../../services/person.service';
import { HttpClient } from '@angular/common/http';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent {
  persons: Person[] = [];

  form!: FormGroup;
  formSubmitted: boolean = false;

  selectedAddress: string = '';
  resultAddresses: any[] = [];
  searchAddress = new Subject<string>();

  constructor(private personService: PersonService, private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.searchAddress.pipe(debounceTime(300)).subscribe(address => {
      this.getData(address).subscribe((data: any) => {
        this.resultAddresses = data.addresses;
      });
    });

    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required]
    })
  }

  getData(value: string) {
    value = encodeURIComponent(value.trim());
    const url = `http://inaadress.maaamet.ee/inaadress/gazetteer?address=${value}`;
    return this.http.jsonp(url, 'callback');
  }

  onInputChange(value: string) {
    if (value.length > 2) {
      this.searchAddress.next(value);
    }
    else if (value.length === 0) {
      this.form.get('address')!.setValue('');
      this.resultAddresses = [];
    }
  }

  clearInput() {
    this.selectedAddress = '';
    this.resultAddresses = [];
    this.form.get('address')!.setValue('');
  }

  onSubmit() {
    if (this.form.valid) {
      const newPerson = this.form.value;
      this.addPerson(newPerson);

      this.form.reset();
      this.selectedAddress = '';
      this.formSubmitted = false;
    }
    else {
      this.formSubmitted = true;
    }
  }

  pickAddress(address: any) {
    this.form.get('address')!.setValue(address);
    this.selectedAddress = address;
    this.resultAddresses = [];
  }

  addPerson(person: Person) {
    this.personService.addPerson(person).subscribe((person) => this.persons.push(person));
  }
}

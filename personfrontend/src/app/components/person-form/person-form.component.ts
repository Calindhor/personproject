import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from '../../Person';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent {
  persons: Person[] = [];

  form!: FormGroup;
  formSubmitted: boolean = false;

  constructor(private personService: PersonService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    new InAadress({ "container": "InAadressDiv", "mode": 3, "ihist": "1993", "appartment": 0, "lang": "et" });

    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required]
    })

    document.addEventListener('addressSelected', (event: any) => {
      var info = event.detail;
      var address = info[0].aadress;
      this.pickAddress(address);
    });

    document.querySelector('.inads-input-clear')!.addEventListener('click', () => {
      this.clearAddress();
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const newPerson = this.form.value;
      this.addPerson(newPerson);

      this.form.reset();
      this.clearAddressField();

      this.formSubmitted = false;
    }
    else {
      this.formSubmitted = true;
    }
  }

  pickAddress(address: any) {
    this.form.get('address')!.setValue(address);
  }

  clearAddress() {
    if (this.form.get('address')!.value != '') {
      this.form.get('address')!.setValue('');
    }
  }

  clearAddressField() {
    var addressInput = document.getElementById('InAadressDiv')!.querySelector('input');
    if (addressInput) {
      addressInput.value = '';
    }

    document.querySelectorAll('.inads-result > li ').forEach(e => e.remove());
    document.querySelector('.inads-result')!.classList.add('hidden');
    document.querySelector('.inads-input-clear')!.classList.add('hidden');
  }

  addPerson(person: Person) {
    this.personService.addPerson(person).subscribe((person) => this.persons.push(person));
  }
}

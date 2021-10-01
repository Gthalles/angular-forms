import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-data-driven',
  templateUrl: './data-driven.component.html',
  styleUrls: ['./data-driven.component.css']
})
export class DataDrivenComponent implements OnInit {

  constructor(private form: FormGroup, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    /*
    this.form = new FormGroup({
      name: new FormControl(null),
      email: new FormControl(null),
    });
    */

    this.form = this.formBuilder.group({
      name: [null],
      email: [null]
    });
  }

}

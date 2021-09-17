import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.css']
})
export class TemplateDrivenComponent implements OnInit {

  user: any = {};
  
  onSubmit(f: any) {
    //3 ways to access the value
    console.log(f.value);
    console.log(this.user);
    console.log(f.form.value);
  }

  constructor() { }

  ngOnInit(): void {
  }


}

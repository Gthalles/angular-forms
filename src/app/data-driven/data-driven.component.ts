import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-driven',
  templateUrl: './data-driven.component.html',
  styleUrls: ['./data-driven.component.css']
})
export class DataDrivenComponent implements OnInit {
  form!: FormGroup;

  validAndTouched(inputField: any){
    let result: boolean;
    result = true;
    if(this.form.get(inputField)?.valid && this.form.get(inputField)?.touched){
      result = false;
    }
    console.log("result = " + result);
    console.log("field valid: " + this.form.get(inputField)?.valid);
    return result;
  }

  verifyEmail(): any{
    let campoEmail = this.form.get('email');


    if(campoEmail?.errors){
      return campoEmail?.errors.required && campoEmail?.touched;
    }
  }

  applyErrorStyle(inputField: any) {
    return {
      'has-error': this.validAndTouched(inputField),
      'has-feedback': this.validAndTouched(inputField)
    }
  }

  reset() {
    this.form.reset();
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    /*
    this.form = new FormGroup({
      name: new FormControl(null),
      email: new FormControl(null),
    });
    */
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: [null, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]
    });
  }

  onSubmit(form: FormGroup) {
    console.log(this.form);

    this.http.post('https://httpbin.org/post', JSON.stringify(this.form.value))
    .subscribe((data: any) => {
      console.log(data);
      this.reset();
    },
    (error: any) => {
      alert("Erro");
    })
  }
}

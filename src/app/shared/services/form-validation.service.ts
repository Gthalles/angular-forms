import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {
    // Função para validar checkbox
  requiredMinCheckbox(min = 1): FormArray {
    const validator: any = (formArray: FormArray) => {
      const totalChecked = formArray?.controls
        .map((v: any) => v.value)
        .reduce((total: any, current: any) => current ? total + current : total, 0)

      return totalChecked >= min ? null : { required: true };
    };

    return validator;
  }

  cepValidator(control: FormControl): any {
    var cep: string = control.value;
    
    if(cep && cep != '') {
       // Expressão regular para validar o CEP
       var validateCep = /^[0-9]{8}$/;
       return validateCep.test(cep) ? null : { invalidCep: true };
    }

    return null;
  }

  equalsTo(otherField: string): any {
    const validator: any = (formControl: FormControl) => {
      if(otherField == null) {
        throw new Error('É necessário informar um campo.');
      }

      if(!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null;
      }

      const field: any = (<FormGroup>formControl.root).get(otherField);

      if(!field) {
        throw new Error('É necessário informar um campo válido.');
      }

      if(field.value !== formControl.value) {
        return { equalsTo: otherField};
      }

      return null;
    };

    return validator;
  }

}

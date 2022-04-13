import { AbstractControl } from '@angular/forms';

export function ValidateDate(control: AbstractControl) {
    if(control.value){

      let pattern = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;    
      let arrayDate = control.value.split('/');
      let datenow = new Date().getDate();  
      let getyearnow = new Date().getFullYear();
      let inputyear = String(getyearnow).slice(0,2)
      let inputyear1 = inputyear + arrayDate[1];
      let inputdate= new Date(Number(inputyear1),Number(arrayDate[0]),datenow)
      let nowdate = new Date();

      if(pattern.test((control.value)) == false || nowdate>inputdate){
          return { invalidDate: true }
      }

    }
  return null;
}
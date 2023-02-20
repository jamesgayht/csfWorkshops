import { Component } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-date-validator',
  templateUrl: './date-validator.component.html',
  styleUrls: ['./date-validator.component.css']
})
export class DateValidatorComponent {
  // static greaterThan(startControl: AbstractControl): ValidatorFn {
  static greaterThan(): ValidatorFn {
    return (endControl: AbstractControl): ValidationErrors | null => {
      const startDate: number = Date.parse(endControl.value)
      const today: number = new Date().getDate(); 

      if (!startDate || !today) {
        console.info(">>> Returning null <<<")
        console.info("startDate.getTime >>> ",startDate)
        console.info("today.getTime >>> ",today)
        return null;
      }
      if(startDate >= today) {
        console.info("startDate.getTime >>> ",startDate)
        console.info("today.getTime >>> ",today)
        console.info(">>> startDate >= today <<<")
        return {greaterThan: true}; 
      }
      if(startDate < today) {
        console.info("startDate.getTime >>> ",startDate)
        console.info("today.getTime >>> ",today)
        console.info(">>> startDate >= today <<<")
        return {greaterThan: false}; 
      }

      return null; 
    }
  }
}

import { Component } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-date-validator',
  templateUrl: './date-validator.component.html',
  styleUrls: ['./date-validator.component.css']
})
export class DateValidatorComponent {
  // static greaterThan(startControl: AbstractControl): ValidatorFn {
  static greaterThan(startDate: number): ValidatorFn {
    return (endControl: AbstractControl): ValidationErrors | null => {
      // const startDate: Date = startControl.value; 
      const endDate: number = endControl.value; 
      if (!startDate || !endDate) {
        console.info(">>> Returning null <<<")
        console.info("startDate.getTime >>> ",startDate)
        console.info("endDate.getTime >>> ",endDate)
        return null;
      }
      if(startDate >= endDate) {
        console.info("startDate.getTime >>> ",startDate)
        console.info("endDate.getTime >>> ",endDate)
        console.info(">>> startDate >= endDate <<<")
        return {greaterThan: true}; 
      }
      if(startDate < endDate) {
        console.info("startDate.getTime >>> ",startDate)
        console.info("endDate.getTime >>> ",endDate)
        console.info(">>> startDate >= endDate <<<")
        return {greaterThan: false}; 
      }

      return null; 
    }
  }
}

import { Injectable } from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormUtilsService {
  validateAllFormFields(formGroup: UntypedFormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control: AbstractControl<unknown> | null = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });

      if (control instanceof UntypedFormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  getErrorMessage(formGroup: UntypedFormGroup, fieldName: string): string {
    const field: UntypedFormControl = formGroup.get(
      fieldName,
    ) as UntypedFormControl;
    return this.getErrorMessageFormField(field);
  }

  private getErrorMessageFormField(field: UntypedFormControl): string {
    if (field.hasError('required')) {
      return 'Campo obrigatório';
    }
    if (field.hasError('minlength')) {
      const requiredLength: number = field.errors
        ? field.errors['minlength']['requiredLength']
        : 6;
      return `Campo deve ter no mínimo ${requiredLength} caracteres`;
    }

    return 'Campo inválido';
  }
}

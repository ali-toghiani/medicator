import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  AbstractControl, FormArray,
  FormControl,
  FormGroup, FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';

import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzTimePickerModule} from 'ng-zorro-antd/time-picker';
import {NzFormControlComponent} from 'ng-zorro-antd/form';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

import {MedicationUnit} from '../../enums/medication-units.enum';
import {MedicationDays} from '../../enums/medication-days.enum';
import {ShortenDayPipe} from '../../pipes/shorten-day.pipe';
import {LocalStorageService} from '../../services/local-storage.service';
import {Medication} from '../../models/medication.model';
import {NzColDirective} from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-add-medication-modal',
  imports: [
    NzModalModule,
    NzButtonModule,
    NzIconModule,
    NzDropDownModule,
    NzSelectModule,
    NzInputModule,
    NzDividerModule,
    NzTimePickerModule,
    NzFormControlComponent,
    NzFormModule,
    ReactiveFormsModule,
    FormsModule,
    ShortenDayPipe,
    NzColDirective,
    NzInputNumberModule
  ],
  templateUrl: './add-medication-modal.component.html',
  styleUrl: './add-medication-modal.component.scss'
})
export class AddMedicationModalComponent {

  @Output() closeModal = new EventEmitter<void>();

  readonly DEFAULT_TIME = new Date(0, 0, 0, 8);
  unitOptions = [
    {
      label: 'Capsules',
      value: MedicationUnit.CAPSULES
    },
    {
      label: 'Tablets',
      value: MedicationUnit.TABLETS
    },
    {
      label: 'Applications',
      value: MedicationUnit.APPLICATIONS
    },
    {
      label: 'Drops',
      value: MedicationUnit.DROPS
    },
    {
      label: 'Milligrams',
      value: MedicationUnit.MILLIGRAMS
    },
    {
      label: 'Micrograms',
      value: MedicationUnit.MICROGRAMS
    }
  ];
  unitValues = this.unitOptions.map(option => option.value);


  form = new FormGroup({
    name: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true
    }),
    dosage: new FormControl<number>(0, {
      validators: [Validators.required, Validators.min(0)],
      nonNullable: true
    }),
    unit: new FormControl<MedicationUnit>(MedicationUnit.TABLETS, {
      validators: [Validators.required, this.allowedStringsValidator(this.unitValues)],
      nonNullable: true
    }),
    days: new FormArray([
      new FormControl(MedicationDays.SAT, {nonNullable: true})
      ],
      [Validators.required, Validators.minLength(1), Validators.maxLength(7)]),
    times: new FormArray([
      new FormControl<Date>(this.DEFAULT_TIME, {nonNullable: true}),
    ], [Validators.required, Validators.minLength(1), Validators.maxLength(5),this.uniqueTimesValidator]),
  })

  readonly days: MedicationDays[] = [
    MedicationDays.SAT,
    MedicationDays.SUN,
    MedicationDays.MON,
    MedicationDays.TUE,
    MedicationDays.WED,
    MedicationDays.THU,
    MedicationDays.FRI
  ];

  constructor(
    private localStorageService: LocalStorageService
  ) {}

  allowedStringsValidator(allowed: string[]) {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      return allowed.includes(value) ? null : { notAllowed: true };
    };
  }

  handleOk(): void {
    this.validateForm();

    if (this.form.invalid){
      return;
    }

    const data = this.getSubmitData();
    this.localStorageService.addMedication(data);
    this.closeModal.emit();
  }

  validateForm(): void {
    Object.values(this.form.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  getSubmitData(): Medication{
    const {name,days,unit,dosage,times} = this.form.controls;
    const data: Medication = {
      name: name.value,
      days: days.value,
      unit: unit.value,
      dosage: dosage.value,
      times: times.value.map( time => time.toISOString().slice(11, 16)),
      id: this.generateId(),
      lastUpdate: new Date().toISOString()
    }
    return data;
  }

  generateId(): number {
    return Math.floor(Math.random()*100000);
  }

  handleCancel(): void {
    this.closeModal.emit();
  }

  toggleDaySelection(day: string): void {
    const daysArray = this.form.get('days') as FormArray;
    const index = daysArray.controls.findIndex(control => control.value === day);

    if (index !== -1) {
      daysArray.removeAt(index);
    } else {
      daysArray.push(new FormControl(day));
    }
  }

  get times(): FormArray {
    return this.form.get('times') as FormArray;
  }

  addTime(): void {
    if (this.times.length < 5) {
      this.times.push(new FormControl(this.DEFAULT_TIME, [Validators.required, this.uniqueTimesValidator]));
    }
  }

  uniqueTimesValidator(control: AbstractControl): ValidationErrors | null {
    if (control instanceof FormArray) {
      const timeValues = control.controls.map((ctrl: any) => {
        const date: Date = ctrl.value;
        return date ? date.toISOString().slice(11, 16) : null;
      });
      const duplicates = new Set<string>();
      control.controls.forEach((ctrl: any, index: number) => {
        const date: Date = ctrl.value;
        const timeString = date ? date.toISOString().slice(11, 16) : null;

        if (timeString && timeValues.indexOf(timeString) < index) {
          ctrl.setErrors({ duplicate: true });
        } else {
          duplicates.add(timeString as string);
        }
      });
      if ([...duplicates].length < timeValues.length) {
        return { duplicate: true };
      }
    }
    return null;
  }

  removeTime(index: number): void {
    this.times.removeAt(index);
  }
}

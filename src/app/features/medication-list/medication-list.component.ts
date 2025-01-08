import { Component } from '@angular/core';
import {NzInputGroupComponent, NzInputModule} from 'ng-zorro-antd/input';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzTableComponent, NzTableModule} from 'ng-zorro-antd/table';
import {Medication} from '../../models/medication.model';
import {MedicationUnit} from '../../enums/medication-units.enum';
import {MedicationDays} from '../../enums/medication-days.enum';
import {DatePipe} from '@angular/common';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-medication-list',
  imports: [
    DatePipe,
    NzIconDirective,
    NzTableModule,
    NzInputModule,
    NzButtonModule,
    FormsModule
  ],
  templateUrl: './medication-list.component.html',
  styleUrl: './medication-list.component.scss'
})
export class MedicationListComponent {

  medications: Medication[] = [
    {
      id: 12345,
      name: 'Aspirin',
      dosage: 500,
      unit: MedicationUnit.MILLIGRAMS,
      days: [MedicationDays.MON, MedicationDays.WED, MedicationDays.FRI],
      times: ['08:00', '20:00'],
      lastUpdate: new Date('2024-12-15T14:23:00'),
    },
    {
      id: 67890,
      name: 'Ibuprofen',
      dosage: 200,
      unit: MedicationUnit.TABLETS,
      days: [MedicationDays.TUE, MedicationDays.THU],
      times: ['07:00', '19:00'],
      lastUpdate: new Date('2025-01-03T09:12:34'),
    },
    {
      id: 54321,
      name: 'Vitamin D',
      dosage: 1,
      unit: MedicationUnit.CAPSULES,
      days: [MedicationDays.SUN],
      times: ['09:00'],
      lastUpdate: new Date('2024-11-28T18:45:00'),
    },
    {
      id: 98765,
      name: 'Cough Syrup',
      dosage: 10,
      unit: MedicationUnit.DROPS,
      days: [MedicationDays.MON, MedicationDays.TUE, MedicationDays.WED],
      times: ['10:00', '22:00'],
      lastUpdate: new Date('2024-10-12T07:30:15'),
    },
    {
      id: 11223,
      name: 'Antibiotic',
      dosage: 250,
      unit: MedicationUnit.MILLIGRAMS,
      days: [MedicationDays.MON, MedicationDays.TUE, MedicationDays.WED, MedicationDays.THU, MedicationDays.FRI],
      times: ['08:00', '20:00'],
      lastUpdate: new Date('2024-11-03T12:14:25'),
    },
    {
      id: 44556,
      name: 'Eye Drops',
      dosage: 2,
      unit: MedicationUnit.APPLICATIONS,
      days: [MedicationDays.SAT, MedicationDays.SUN],
      times: ['06:00', '18:00'],
      lastUpdate: new Date('2024-12-01T08:05:40'),
    },
    {
      id: 77889,
      name: 'Calcium Supplement',
      dosage: 500,
      unit: MedicationUnit.MILLIGRAMS,
      days: [MedicationDays.MON, MedicationDays.WED, MedicationDays.FRI],
      times: ['08:30'],
      lastUpdate: new Date('2025-01-02T16:22:10'),
    },
    {
      id: 99001,
      name: 'Insulin',
      dosage: 15,
      unit: MedicationUnit.DROPS,
      days: [MedicationDays.MON, MedicationDays.TUE, MedicationDays.WED, MedicationDays.THU, MedicationDays.FRI, MedicationDays.SAT, MedicationDays.SUN],
      times: ['07:00', '19:00'],
      lastUpdate: new Date('2024-12-20T21:18:50'),
    },
    {
      id: 33445,
      name: 'Multivitamin',
      dosage: 1,
      unit: MedicationUnit.TABLETS,
      days: [MedicationDays.TUE, MedicationDays.THU, MedicationDays.SAT],
      times: ['08:00'],
      lastUpdate: new Date('2024-10-30T15:12:30'),
    },
    {
      id: 55667,
      name: 'Pain Relief Gel',
      dosage: 2,
      unit: MedicationUnit.APPLICATIONS,
      days: [MedicationDays.SUN],
      times: ['10:00', '22:00'],
      lastUpdate: new Date('2024-11-15T06:40:00'),
    },
  ];
  filteredMedications: Medication[] = [...this.medications];
  searchTerm = "";
  handleSearch(term: string): void {
    if (!term){
      this.filteredMedications = [...this.medications]
    } else {
      this.filteredMedications = this.filteredMedications.filter(medication => medication.name.toLowerCase().includes(term.toLowerCase()));
    }
  }
}

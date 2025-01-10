import {Component, computed, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';

import {NzInputModule} from 'ng-zorro-antd/input';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzButtonModule} from 'ng-zorro-antd/button';

import {Medication} from '../../models/medication.model';

import {AddMedicationModalComponent} from '../add-medication-modal/add-medication-modal.component';
import {ResultHighlighterDirective} from '../../directives/result-highlighter.directive';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-medication-list',
  imports: [
    DatePipe,
    NzTableModule,
    NzInputModule,
    NzButtonModule,
    ResultHighlighterDirective,
    FormsModule,
    AddMedicationModalComponent
  ],
  templateUrl: './medication-list.component.html',
  styleUrl: './medication-list.component.scss'
})
export class MedicationListComponent {

  searchTerm = signal<string>('');
  medications = signal<Medication[]>([]);
  filteredMedications = computed(() =>
    this.localStorageService.medications().filter((medication) =>
      medication.name.toLowerCase().includes(this.searchTerm().toLowerCase())
    )
  );
  isVisibleAddModal = false;

  constructor(
    private localStorageService: LocalStorageService
  ) {
    this.medications = this.localStorageService.medications
  }
}

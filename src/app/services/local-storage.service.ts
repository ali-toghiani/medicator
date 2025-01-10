import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Medication} from '../models/medication.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly LOCAL_STORAGE_KEY = 'medications';
  public medications = signal<Medication[]>([]);

  constructor(private http: HttpClient) {
    this.initializeMedications();
  }

  private initializeMedications(): void {
    const storedData = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    if (storedData) {
      this.medications.set(JSON.parse(storedData));
    } else {
      this.fetchMockData();
    }
  }

  private fetchMockData(): void {
    this.http.get<Medication[]>('/assets/mock-data/medications.json').subscribe((data) => {
      this.medications.set(data);
      localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(data));
    });
  }

  addMedication(medication: Medication): void {
    const updatedMedications = [...this.medications(), medication];
    this.medications.set(updatedMedications);
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(updatedMedications));
  }

}

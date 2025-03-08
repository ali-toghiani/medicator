import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Medication } from '../models/medication.model';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

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
    try {
      const storedData = localStorage.getItem(this.LOCAL_STORAGE_KEY);
      if (storedData) {
        this.medications.set(JSON.parse(storedData));
      } else {
        this.fetchMockData();
      }
    } catch (error) {
      console.error('Error initializing medications:', error);
      this.fetchMockData();
    }
  }

  private fetchMockData(): void {
    this.http.get<Medication[]>('assets/mock-data/medications.json')
      .pipe(
        catchError(error => {
          console.error('Error fetching mock data:', error);
          return of([]);
        })
      )
      .subscribe((data) => {
        this.medications.set(data);
        this.saveToLocalStorage(data);
      });
  }

  /**
   * Adds a new medication to the list
   * @param medication The medication to add
   */
  addMedication(medication: Medication): void {
    const updatedMedications = [...this.medications(), medication];
    this.medications.set(updatedMedications);
    this.saveToLocalStorage(updatedMedications);
  }

  /**
   * Updates an existing medication
   * @param updatedMedication The medication with updated values
   * @returns boolean indicating if update was successful
   */
  updateMedication(updatedMedication: Medication): boolean {
    const currentMedications = this.medications();
    const index = currentMedications.findIndex(med => med.id === updatedMedication.id);
    
    if (index === -1) return false;
    
    const updatedMedications = [...currentMedications];
    updatedMedications[index] = updatedMedication;
    
    this.medications.set(updatedMedications);
    this.saveToLocalStorage(updatedMedications);
    return true;
  }

  /**
   * Deletes a medication by its ID
   * @param medicationId The ID of the medication to delete
   * @returns boolean indicating if deletion was successful
   */
  deleteMedication(medicationId: string | number): boolean {
    const currentMedications = this.medications();
    const filteredMedications = currentMedications.filter(med => med.id !== medicationId);
    
    if (filteredMedications.length === currentMedications.length) return false;
    
    this.medications.set(filteredMedications);
    this.saveToLocalStorage(filteredMedications);
    return true;
  }

  /**
   * Gets a medication by its ID
   * @param medicationId The ID of the medication to retrieve
   * @returns The medication or undefined if not found
   */
  getMedicationById(medicationId: string | number): Medication | undefined {
    return this.medications().find(med => med.id === medicationId);
  }

  /**
   * Resets to the default medications from mock data
   */
  resetToDefaults(): void {
    this.fetchMockData();
  }

  /**
   * Clears all medications
   */
  clearAll(): void {
    this.medications.set([]);
    localStorage.removeItem(this.LOCAL_STORAGE_KEY);
  }

  /**
   * Helper method to save data to localStorage with error handling
   */
  private saveToLocalStorage(data: Medication[]): void {
    try {
      localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }
}

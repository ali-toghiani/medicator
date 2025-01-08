import {MedicationUnit} from '../enums/medication-units.enum';
import {MedicationDays} from '../enums/medication-days.enum';

export interface Medication {
  id: number;
  name: string;
  dosage: number;
  unit: MedicationUnit;
  days: MedicationDays[];
  times: string[];
  lastUpdate: Date;
}

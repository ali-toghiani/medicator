import {Routes} from '@angular/router';
import {BaseRoutes} from './enums/routes.enum';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: BaseRoutes.LIST,
  },
  {
    path: BaseRoutes.LIST,
    loadComponent: () => import("./features/medication-list/medication-list.component").then(m => m.MedicationListComponent)
  },
  {
    path: "**",
    redirectTo: BaseRoutes.LIST
  }
];

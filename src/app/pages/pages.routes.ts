import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { HomeComponent } from './home/home.component';

const pagesRoutes: Routes = [
    {
            path: '',
            component: PagesComponent,
            children: [
                { path: 'dashboard', component: DashboardComponent },
                { path: 'progress', component: ProgressComponent },
                { path: 'graficas1', component: Graficas1Component },
                { path: 'home', component: HomeComponent },
                { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
            ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes);
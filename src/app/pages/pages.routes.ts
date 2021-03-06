import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { HomeComponent } from './home/home.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// Guards
import { LoginGuardGuard } from '../services/service.index';
import { AdminGuard } from '../services/service.index';

import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicoComponent } from './medicos/medico.component';
import { MedicosComponent } from './medicos/medicos.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

const pagesRoutes: Routes = [
    {
            path: '',
            component: PagesComponent,
            // con esto si o si tienen que estar logeado para poder visualizar estas rutas
            canActivate: [ LoginGuardGuard],
            children: [
                { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
                { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
                { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas' } },
                { path: 'home', component: HomeComponent, data: { titulo: 'Home' } },
                { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
                { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
                { path: 'accout-settings', component: AccoutSettingsComponent, data: { titulo: 'Ajustes del tema' } },
                { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
                { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'buscador' } },

                // Mantenimiento
                {
                    path: 'usuarios',
                    component: UsuariosComponent,
                    // esta validacion es para que solo los admin role puedan realizar esta peticion
                    canActivate: [ AdminGuard ],
                    data: { titulo: 'Mantenimientos de Usuarios' }
                },
                { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimientos de Hospitales' } },
                { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimientos de Medicos' } },
                { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Medico' } },
                { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
            ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes);
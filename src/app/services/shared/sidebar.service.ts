import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [];
  // menu: any = [
  //   {
  //     titulo: 'Principal',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Dashboard', url: '/dashboard'},
  //       { titulo: 'ProgressBar', url: '/progress'},
  //       { titulo: 'Gráficas', url: '/graficas1'},
  //       { titulo: 'Promesas', url: '/promesas'},
  //       { titulo: 'RxJs', url: '/rxjs'}
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimientos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: '/usuarios' },
  //       { titulo: 'Hospitales', url: '/hospitales' },
  //       { titulo: 'Médicos', url: '/medicos' },
  //       { titulo: 'Pacientes', url: '/pacientes'}
  //     ]
  //   }
  // ];
  constructor(
    public usuarioService: UsuarioService
  ) { }


  cargarMenu() {
    this.menu = this.usuarioService.menu;
  }
}

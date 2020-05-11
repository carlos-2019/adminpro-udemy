import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  // para la paginacion
  desde: number = 0;

  totalRegistros: number = 0;

  // para la busqueda
  cargando: boolean = true;


  constructor(
    public usuarioService: UsuarioService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.modalUploadService.notificacion
        .subscribe( resp => this.cargarUsuarios());
  }

  mostrarModal( id: string) {
      this.modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios() {

      this.cargando = true;
      this.usuarioService.cargarUsuarios(this.desde)
                         .subscribe( (resp: any) => {
                            console.log(resp);
                            this.totalRegistros = resp.total;
                            this.usuarios = resp.usuarios;
                            this.cargando = false;
                         });
  }

  // cambiar los usuarios +5 o -5
  cambiarDesde( valor: number ) {

    let desde = this.desde + valor;

    console.log( desde );

    if ( desde >= this.totalRegistros ) {
      return;
    }
    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  // Metodo buscar

  buscarUsuario( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;

    this.usuarioService.buscarUsuarios( termino )
            .subscribe((usuarios: Usuario[]) => {
                this.usuarios = usuarios;
                this.cargando = false;
            });
  }

  // Metdo borrar
  borrarUsuario( usuario: Usuario ) {
      if ( usuario._id === this.usuarioService.usuario._id ) {
        Swal.fire(
          'No puede borrar usuario!',
          'No se puede borrar a si mismo',
          'error'
        );
        return;

      } else {
        Swal.fire({
          title: '¿Esta seguro?',
          text: 'Esta a punto de borrar a ' + usuario.nombre,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, borralo',
          cancelButtonText: 'No, cancela',
          reverseButtons: true
        })
        .then( borrar => {
          console.log( borrar );
          if ( borrar.value ) {
            this.usuarioService.borrarUsuario( usuario._id ).subscribe( borrado => {
              console.log(borrado);
              this.cargarUsuarios();
            });

          } else if ( borrar.dismiss === Swal.DismissReason.cancel ) {
            Swal.fire('Cancelado', 'Tranquilo no se ha borrado nada!!', 'error');
          }

        });
      }
  }

  guardarUsuario( usuario: Usuario) {
    this.usuarioService.actualizarUsuario( usuario)
        .subscribe();
  }
}

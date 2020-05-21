import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public usuarioService: UsuarioService,
    public http: HttpClient
  ) { }

  cargarMedicos() {

    let url = URL_SERVICIOS + '/medico';

    return this.http.get( url )
               .map( (resp: any) => {
                  this.totalMedicos = resp.total;
                  return resp.medicos;
               });
  }

    cargarMedico( id: string ) {

        let url = URL_SERVICIOS + '/medico/' + id;

        return this.http.get( url )
                    .map( (resp: any) => resp.medico);
    }

    // busqueda de medico
    buscarMedicos( termino: string) {
      let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
      return this.http.get(url)
                 .map((resp: any) => resp.medicos);
  }

    borrarMedico( id: string ) {

      let url = URL_SERVICIOS + '/medico/' + id;
      url += '?token=' + this.usuarioService.token;

      return this.http.delete( url )
                .map( resp => {
                  Swal.fire('Medico borrado',
                            'El Medico a sido eliminado correctamente!!',
                            'success'
                  );
                  return resp;
                });
    }

    guardarMedico( medico: Medico ) {

      let url = URL_SERVICIOS + '/medico';
      // hacer una validadcion si sera actulizar o crear medico
      if ( medico._id) {
        // actualizando
        url += '/' + medico._id;
        url += '?token=' + this.usuarioService.token;
        return this.http.put( url, medico )
                   .map( (resp: any) => {

                    Swal.fire('Medico Actualizado',
                    medico.nombre,
                    'success'
                      );
                    return resp.medico;
                   });

      } else {
        // creando
        url += '?token=' + this.usuarioService.token;

        return this.http.post( url, medico )
              .map( (resp: any) => {
                Swal.fire('Medico Creado',
                              medico.nombre,
                              'success'
                    );
                return resp.medico;
              });
      }
    }

}

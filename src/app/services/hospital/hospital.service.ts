import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';

import Swal from 'sweetalert2';
import { Hospital } from '../../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number = 0;

  constructor(
    public http: HttpClient,
    // para obtener el token
    public usuarioService: UsuarioService
  ) { }

  // para cargar los hospitales
  cargarHospitales() {

    let url = URL_SERVICIOS + '/hospital';
    return this.http.get( url )
               .map( (resp: any) => {
                this.totalHospitales = resp.total;
                return resp.hospitales;
                });

  }

  // para obtener los hospitales
  obtenerHospital( id: string ) {

      let url = URL_SERVICIOS + '/hospital/' + id;
      return this.http.get( url )
                 .map( (resp: any) => resp.hospital);
  }

  // para borrar hospital
  borrarHospital( id: string ) {
     let url = URL_SERVICIOS + '/hospital/' + id;
     url += '?token=' + this.usuarioService.token;
     return this.http.delete( url )
                .map( resp => Swal.fire(
                  'Hospital Borrado!',
                  'Eliminado correctamente',
                  'success'
                ));
  }

  // crear Hospital
  crearHospital( nombre: string ) {

    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this.usuarioService.token;

    return this.http.post( url, { nombre } )
              .map( (resp: any) => resp.hospital );
  }

  // buscar hospital
  buscarHospital( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get(url)
                 .map((resp: any) => resp.hospitales);
  }

  // actualizar hospital
  actualizarHospital( hospital: Hospital) {

    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this.usuarioService.token;

    return this.http.put( url, hospital )
               .map( (resp: any) => {
                Swal.fire(
                  'Hospital Actualizado!',
                  hospital.nombre,
                  'success'
                );
                return resp.hospital;
                });
  }
}

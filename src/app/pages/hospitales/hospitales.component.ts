import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  constructor(

    public hospitalService: HospitalService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this.modalUploadService.notificacion
          .subscribe( () => this.cargarHospitales() );
  }

  buscarHospital( termino: string ) {
    if ( termino.length <= 0 ) {
      this.cargarHospitales();
      return;
    }

    this.hospitalService.buscarHospital( termino )
          .subscribe( hospitales => this.hospitales = hospitales );
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales()
        .subscribe( hospitales => this.hospitales = hospitales);
  }

  guardarHospital( hospital: Hospital ) {

      this.hospitalService.actualizarHospital( hospital )
            .subscribe();
  }

  borrarHospital( hospital: Hospital ) {
      this.hospitalService.borrarHospital( hospital._id)
            .subscribe( () => this.cargarHospitales() );
  }

  crearHospital() {
    Swal.fire({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del Hospital',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Guardar',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    }).then((valor) => {
      if ( !valor.value || valor.value.length === 0) {
        return;
      }
      this.hospitalService.crearHospital( valor.value )
            .subscribe( () => this.cargarHospitales());
    });
  }

  actualizarImagen( hospital: Hospital) {
    this.modalUploadService.mostrarModal( 'hospitales', hospital._id );

  }
}

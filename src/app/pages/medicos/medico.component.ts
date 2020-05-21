import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  // para poder llenar el combobox
  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '' , '' , '' , '');
  hospital: Hospital = new Hospital('');

  constructor(
    public medicosService: MedicoService,
    public hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public modalUpdaloadService: ModalUploadService
  ) {

    activatedRoute.params.subscribe( params => {
      let id = params[ 'id' ];
      if ( id !== 'nuevo' ) {
            this.cargarMedico( id );
      }
    })
  }

  ngOnInit(): void {

 // para poder llenar el combobox
    this.hospitalService.cargarHospitales()
          .subscribe( hospitales => this.hospitales = hospitales );

    this.modalUpdaloadService.notificacion
            .subscribe( resp =>  {

              this.medico.img = resp.medico.img;

            });
  }

  cargarMedico( id: string ) {
    this.medicosService.cargarMedico( id )
          .subscribe( medico => {

            console.log( medico );
            this.medico = medico;
            this.medico.hospital = medico.hospital._id;
            this.cambioHospital( this.medico.hospital );
          });
  }

  guardarMedico( f: NgForm) {

    console.log( f.valid );
    console.log( f.value );

    if ( f.invalid ) {
      return;
    }

    this.medicosService.guardarMedico( this.medico )
          .subscribe( medico => {

            this.medico._id = medico._id;
            this.router.navigate(['/medico', medico._id]);
          });
  }

  cambioHospital( id: string ) {
      this.hospitalService.obtenerHospital( id )
              .subscribe( hospital => this.hospital = hospital );
  }

  cambiarFoto() {
    this.modalUpdaloadService.mostrarModal( 'medicos', this.medico._id );
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  recuerdame: boolean = false;

  auth2: any;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
    ) { }

  ngOnInit(): void {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1 ) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '509384891566-am6lnvaq6ftmh609snav53dt2qhmkshb.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin( element ) {
      this.auth2.attachClickHandler( element, {}, (googleUser) => {
        // let profile = googleUser.getBasicProfile();
        let token = googleUser.getAuthResponse().id_token;
        this._usuarioService.loginGoogle( token )
            .subscribe( resp => {
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              });
              Toast.fire({
                icon: 'success',
                title: 'Inicio de Sección satisfactoriamente'
              });
            window.location.href = '#/dashboard';
          });
      });
  }

  ingresar( forma: NgForm) {

    if (forma.invalid) {
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._usuarioService.login( usuario, forma.value.recuerdame)
    .subscribe(resp => {

    // usando sweetalerts
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });
      Toast.fire({
        icon: 'success',
        title: 'Inicio de Sección satisfactoriamente'
      });
      // redireccionar al inicio
      this.router.navigate(['/dashboard']);
    });
  }
}

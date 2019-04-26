import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';

import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { HospitalService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = [];
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public hospitalService: HospitalService, public modalUploadService: ModalUploadService) {}

  ngOnInit() {
    this.cargarHospitales();
    this.modalUploadService.notificacion.subscribe(() => this.cargarHospitales());
  }

  mostrarModal(id: string) {
    this.modalUploadService.mostrarModal('hospitales', id);
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales().subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.hospitales = resp.hospitales;
      this.cargando = false;
    });
  }

  buscarHospital(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;

    this.hospitalService.buscarHospitales(termino).subscribe((hospitales: Hospital[]) => {
      this.hospitales = hospitales;
      this.cargando = false;
    });
  }

  crearHospital() {
    Swal.fire({
      type: 'info',
      input: 'text',
      inputAttributes: {
        placeholder: 'Nombre'
      },
      showCancelButton: true,
      inputValidator: value => {
        if (!value) {
          return 'Debe ingresar un Nombre';
        } else {
          const hospital = new Hospital(value);
          this.hospitalService.crearHospital(hospital).subscribe(() => {
            this.cargarHospitales();
          });
        }
      },
      title: 'Crear Hospital',
      text: 'Ingrese nombre del hospital'
    });
  }

  borrarHospital(hospital: Hospital) {
    Swal.fire({
      title: 'Esta seguro?',
      text: `Esta a punto de borrar a ${hospital.nombre}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        this.hospitalService.borrarHospital(hospital._id).subscribe(resp => {
          console.log(resp);
          Swal.fire('Borrado!', `El hospital ${hospital.nombre} ha sido borrado`, 'success');
          this.cargarHospitales();
        });
      }
    });
  }

  guardarHospital(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital).subscribe();
  }
}

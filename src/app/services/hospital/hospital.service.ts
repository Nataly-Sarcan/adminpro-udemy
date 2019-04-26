import { Injectable } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  hospital: Hospital;
  token: string;

  constructor(public http: HttpClient, public router: Router, public subirArchivoService: SubirArchivoService) {
    this.cargarStorage();
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }
  }

  crearHospital(hospital: Hospital) {
    const url = URL_SERVICIOS + `/hospital/?token=${this.token}`;

    return this.http.post(url, hospital).pipe(
      map((resp: any) => {
        Swal.fire({
          type: 'success',
          title: 'Hospital creado',
          text: hospital.nombre
        });
        return resp.hospital;
      })
    );
  }

  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this.token;
    return this.http.put(url, hospital).pipe(
      map((resp: any) => {
        Swal.fire({
          type: 'success',
          title: 'Hospital actualizado',
          text: `${hospital.nombre} actualizado a ${resp.hospital.nombre}`
        });
        return true;
      })
    );
  }

  cambiarImagen(archivo: File, id: string) {
    this.subirArchivoService
      .subirArchivo(archivo, 'hospitales', id)
      .then((resp: any) => {
        this.hospital.img = resp.hospital.img;
        Swal.fire({
          type: 'success',
          title: 'Imagen actualizada',
          text: this.hospital.nombre
        });
      })
      .catch(resp => {
        console.log(resp);
      });
  }

  cargarHospitales() {
    const url = URL_SERVICIOS + `/hospital`;

    return this.http.get(url);
  }

  buscarHospitales(termino: string) {
    const url = URL_SERVICIOS + `/busqueda/coleccion/hospitales/${termino}`;
    return this.http.get(url).pipe(map((resp: any) => resp.hospitales));
  }

  borrarHospital(id: string) {
    const url = URL_SERVICIOS + `/hospital/${id}?token=${this.token}`;
    return this.http.delete(url);
  }

  obtenerHospital(id: string) {}
}

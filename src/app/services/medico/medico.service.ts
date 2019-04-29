import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Medico } from 'src/app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  constructor(public http: HttpClient, public usuarioService: UsuarioService) {}

  cargarMedicos() {
    const url = URL_SERVICIOS + '/medico';
    return this.http.get(url);
  }

  buscarMedicos(termino: string) {
    const url = URL_SERVICIOS + `/busqueda/coleccion/medicos/${termino}`;
    return this.http.get(url).pipe(map((resp: any) => resp.medicos));
  }

  borrarMedico(id: string) {
    const url = URL_SERVICIOS + `/medico/${id}?token=${this.usuarioService.token}`;
    return this.http.delete(url).pipe(
      map(() =>
        Swal.fire({
          type: 'success',
          title: 'Medico Borrado',
          text: 'Eliminado correctamente'
        })
      )
    );
  }

  crearMedico(medico: Medico) {
    let url = URL_SERVICIOS + `/medico`;

    if (medico._id) {
      // actualizando
      url += `/${medico._id}`;
      url += `?token=${this.usuarioService.token}`;
      return this.http.put(url, medico).pipe(
        map((resp: any) => {
          Swal.fire({
            type: 'success',
            title: 'Médico actualizado',
            text: medico.nombre
          });
          return resp.medico;
        })
      );
    } else {
      // creando
      url += `?token=${this.usuarioService.token}`;
      return this.http.post(url, medico).pipe(
        map((resp: any) => {
          Swal.fire({
            type: 'success',
            title: 'Médico creado',
            text: medico.nombre
          });
          return resp.medico;
        })
      );
    }
  }

  cargarMedico(id: string) {
    const url = URL_SERVICIOS + `/medico/${id}`;
    return this.http.get(url).pipe(map((resp: any) => resp.medico));
  }
}

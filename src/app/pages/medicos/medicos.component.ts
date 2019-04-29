import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public medicoService: MedicoService) {}

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos().subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.medicos = resp.medicos;
      this.cargando = false;
    });
  }

  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }

    this.cargando = true;

    this.medicoService.buscarMedicos(termino).subscribe((medicos: Medico[]) => {
      this.medicos = medicos;
      this.cargando = false;
    });
  }

  borrarMedico(medico: Medico) {
    Swal.fire({
      title: 'Esta seguro?',
      text: `Esta a punto de borrar a ${medico.nombre}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        this.medicoService.borrarMedico(medico._id).subscribe(resp => {
          console.log(resp);
          Swal.fire('Borrado!', `El medico ${medico.nombre} ha sido borrado`, 'success');
          this.cargarMedicos();
        });
      }
    });
  }
}

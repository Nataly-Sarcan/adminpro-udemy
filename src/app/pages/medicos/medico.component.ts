import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService, MedicoService } from 'src/app/services/service.index';
import { Medico } from 'src/app/models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public hospitalService: HospitalService,
    public medicoService: MedicoService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id !== 'nuevo') {
        this.cargarMedico(id);
      }
    });
  }

  ngOnInit() {
    this.hospitalService.cargarHospitales().subscribe((resp: any) => {
      this.hospitales = resp.hospitales;
    });
    this.modalUploadService.notificacion.subscribe(resp => {
      this.medico.img = resp.medico.img;
    });
  }

  cargarMedico(id: string) {
    this.medicoService.cargarMedico(id).subscribe(medico => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });
  }

  guardarMedico(f: NgForm) {
    console.log(f.valid, f.value);
    if (f.invalid) {
      return;
    }
    this.medicoService.crearMedico(this.medico).subscribe(medico => {
      this.medico._id = medico._id;
      this.router.navigate(['/medico', medico._id]);
    });
  }

  cambioHospital(id: string) {
    this.hospitalService.obtenerHospital(id).subscribe(hospital => (this.hospital = hospital));
  }

  cambiarFoto() {
    this.modalUploadService.mostrarModal('medicos', this.medico._id);
  }
}

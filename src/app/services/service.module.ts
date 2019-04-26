import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService, SidebarService, SharedService, UsuarioService, LoginGuardGuard, SubirArchivoService } from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

@NgModule({
  providers: [SettingsService, SidebarService, SharedService, UsuarioService, LoginGuardGuard, SubirArchivoService, ModalUploadService],
  declarations: [],
  imports: [CommonModule, HttpClientModule]
})
export class ServiceModule {}

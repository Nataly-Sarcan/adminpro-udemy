import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService, SidebarService, SharedService, UsuarioService, LoginGuardGuard, SubirArchivoService } from './service.index';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  providers: [SettingsService, SidebarService, SharedService, UsuarioService, LoginGuardGuard, SubirArchivoService],
  declarations: [],
  imports: [CommonModule, HttpClientModule]
})
export class ServiceModule {}

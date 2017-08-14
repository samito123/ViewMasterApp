import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { LeftMenuPage } from '../pages/leftMenu/leftMenu';
import { TabListaAddPacientesPage } from '../pages/tabs/tabListaAddPacientes/tabListaAddPacientes';
import { PacientesPage } from '../pages/tabs/pacientes/pacientes';
import { ListaPacientesPage } from '../pages/listaPacientes/listaPacientes';
import { AdicionarPacientesPage } from '../pages/adicionarPacientes/adicionarPacientes';
import { VisualizarPacientesPage } from '../pages/visualizarPacientes/visualizarPacientes';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    LeftMenuPage,
    TabListaAddPacientesPage,
    PacientesPage,
    ListaPacientesPage,
    AdicionarPacientesPage,
    VisualizarPacientesPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    LeftMenuPage,
    TabListaAddPacientesPage,
    PacientesPage,
    ListaPacientesPage,
    AdicionarPacientesPage,
    VisualizarPacientesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

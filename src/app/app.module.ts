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
import { TabListaAddPacientesPage } from '../pages/pacientes/tabListaAddPacientes/tabListaAddPacientes';
import { ListaPacientesPage } from '../pages/pacientes/listaPacientes/listaPacientes';
import { AdicionarPacientesPage } from '../pages/pacientes/adicionarPacientes/adicionarPacientes';
import { VisualizarPacientesPage } from '../pages/pacientes/visualizarPacientes/visualizarPacientes';
import { TabVisualizarReceitaAgendamentoPacientePage } from '../pages/pacientes/tabVisualizarReceitaAgendamentoPaciente/tabVisualizarReceitaAgendamentoPaciente';
import { ListarReceitasPage } from '../pages/receitas/listarReceitas/listarReceitas';
import { AdicionarReceitaPage } from '../pages/receitas/adicionarReceita/adicionarReceita';

@NgModule({ 
  declarations: [
    MyApp,
    LoginPage,
    LeftMenuPage,
    TabListaAddPacientesPage,
    ListaPacientesPage,
    AdicionarPacientesPage,
    VisualizarPacientesPage,
    TabVisualizarReceitaAgendamentoPacientePage,
    ListarReceitasPage,
    AdicionarReceitaPage
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
    ListaPacientesPage,
    AdicionarPacientesPage,
    VisualizarPacientesPage,
    TabVisualizarReceitaAgendamentoPacientePage,
    ListarReceitasPage,
    AdicionarReceitaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { LeftMenuPage } from '../pages/leftMenu/leftMenu';
import { PacientesPage } from '../pages/tabs/pacientes/pacientes';
import { ListaPacientesPage } from '../pages/listaPacientes/listaPacientes';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    LeftMenuPage,
    PacientesPage,
    ListaPacientesPage
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
    PacientesPage,
    ListaPacientesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

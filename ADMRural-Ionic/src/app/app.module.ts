import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
//import { SplashPageModule} from './pages/splash/splash.module';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppLauncher, AppLauncherOptions } from '@ionic-native/app-launcher/ngx';
import { Platform } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { NgxMaskIonicModule } from 'ngx-mask-ionic';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BrMasker4Module } from 'brmasker4';
import { TextMaskModule } from 'angular2-text-mask';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { DatabaseProvider } from '../providers/database/database';
import { SqlStorage } from '../providers/sql-storage/sql-storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Network }     from '@ionic-native/network/ngx';

@NgModule({
  
  declarations: [AppComponent],  
  imports: [ TextMaskModule, ReactiveFormsModule, BrMasker4Module,FormsModule ,BrowserModule, HttpClientModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule,NgxMaskIonicModule.forRoot()],  
  providers: [
    NgxMaskIonicModule,
    StatusBar,
    SplashScreen,
    
    InAppBrowser,
    AppLauncher,
    //SplashPage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    File,
    WebView,
    FilePath,
    SQLite,
    Geolocation,
    NativeGeocoder,
    FormBuilder,
    SqlStorage,
    DatabaseProvider,
    Network
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
export class ViewsModule {}

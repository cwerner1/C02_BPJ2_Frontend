import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'apps'
    },
    {
      title: 'Wohnung Finden',
      url: '/list',
      icon: 'search'
    },
    {
      title: 'Inserat Erstellen',
      url: '/inserat',
      icon: 'home'
    },
    {
      title: 'Favoriten',
      url: '/favorites',
      icon: 'heart'
    },
    {
      title: 'Profil',
      url: '/profil',
      icon: 'contact'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

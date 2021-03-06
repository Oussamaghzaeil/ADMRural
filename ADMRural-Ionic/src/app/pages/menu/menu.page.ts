import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
 
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  selectedPath = '';
 
  pages = [
    {
      title: 'Menu Principal',
      url: '/menu/options',
      icon : 'menu'
    },
    {
      title: 'Perfil',
      icon :'person',
      url: '/menu/minhaconta'
    },
    {
      title: 'Sync',
      icon :'sync',
      url: '/sync'
    }

  ];
 
  constructor(
      private router: Router) {
      this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
  }

  ngOnInit() {
 
  }
 
}


  import { Component } from '@angular/core';
  import { RouterModule, RouterOutlet } from '@angular/router';
  import {MatSidenavModule} from '@angular/material/sidenav';
  import {MatListModule} from '@angular/material/list'
  import {MatIconModule} from '@angular/material/icon'
  import { MatButtonModule } from '@angular/material/button';
  import { CommonModule } from '@angular/common';



  @Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule,MatSidenavModule, MatListModule, MatIconModule, MatButtonModule, RouterOutlet, RouterModule],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
  })
  export class SidebarComponent {
    isExpanded: boolean=true;// estado del menu, expandido, contraído

    constructor() {
      console.log('SidebarComponent inicializado');
    }

    menuItems = [
      { title: 'Compañias', icon:'dashboard',link: '/company' },
      { title: 'Sucursales',icon:'local_convenience_store ', link: '/sucursal' },
      { title: 'Productos', icon:'analytics',link: '/product' },
      { title: 'Motivos Movimientos',icon:'dashboard', link: '/motivoMovimiento' },
      { title: 'Lista de Stock', icon:'video_library',link: '/inventario' },
      { title: 'Lista de Inventario Producto',icon:'analytics', link: '/inventarioProducto' }
    ];

    toggleSidenav(){
      console.log('Toggling sidenav');
      this.isExpanded=!this.isExpanded;
      console.log('Estado del sidebar:', this.isExpanded ? 'Expandido' : 'Colapsado');
    }
    sidenavWidth(): string {
      return this.isExpanded ? '250px' : '65px';
    }

  }


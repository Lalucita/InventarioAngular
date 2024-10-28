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
  isExpanded=true;// estado del menu, expandido, contraído

  menuItems = [
    { title: 'Compañias', link: '/company' },
    { title: 'Sucursales', link: '/sucursal' },
    { title: 'Productos', link: '/product' },
    { title: 'Motivos Movimientos', link: '/motivoMovimiento' },
    { title: 'Lista de Stock', link: '/inventario' }
  ];

  toggleSidenav(){
    this.isExpanded=!this.isExpanded;
  }

}


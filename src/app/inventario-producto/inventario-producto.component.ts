import { InventarioProducto } from './../models/inventarioProducto.model';
import { InventarioService } from './../services/inventario.service';
import { Component,OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-inventario-producto',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule],
  templateUrl: './inventario-producto.component.html',
  styleUrl: './inventario-producto.component.scss'
})
export class InventarioProductoComponent implements OnInit{
 
  displayedColumns: string[] = ['inventarioProductoId', 'sucursalName', 'companyName','productName', 
    'cantidad', 'fechaVenc', 'estadoLoteNombre','creationDate','nroLote'];
  dataSource = new MatTableDataSource<InventarioProducto>();

  @ViewChild(MatSort) sort!:MatSort;

  constructor (private inventarioService:InventarioService){}

  ngOnInit(): void {
    this.inventarioService.getInventarioProductoList().subscribe({
      next:(data:InventarioProducto[])=>{
        this.dataSource.data=data.map(item=> new InventarioProducto(item));
        this.dataSource.sort=this.sort;
      },
      error:(error)=>{
        console.error('Error al obtener Productos',error)
      }
    });
  }
}

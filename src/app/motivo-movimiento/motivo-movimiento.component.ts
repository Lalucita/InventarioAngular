import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotivoMovimientoService } from '../services/motivo_movimiento';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MotivoMovimiento } from '../models/motivoMovimiento.model';

@Component({
  selector: 'app-motivo-movimiento',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule],
  templateUrl: './motivo-movimiento.component.html',
  styleUrl: './motivo-movimiento.component.scss'
})
export class MotivoMovimientoComponent implements OnInit{
  displayedColumns:string[]=['motivoMovimientoID','motivoName','creationDate','lastModifiedDate']
  dataSource = new MatTableDataSource<MotivoMovimiento>();

  @ViewChild(MatSort) sort!:MatSort;
  
  constructor(private motivoMovimientoService:MotivoMovimientoService){}

  ngOnInit():void{
    this.motivoMovimientoService.getMotivoMovimientoInventario().subscribe({
      next:(data:MotivoMovimiento[])=>{
        console.log('Datos de Motivos Movimmientos Inventarios', data);
        this.dataSource.data=data.map(item=>new MotivoMovimiento(item));
        this.dataSource.sort=this.sort;
      },
      error:(error)=>{
        console.error('Error al obtener Motivos Movimiento Inventarios', error)
      }
    });
  }
}

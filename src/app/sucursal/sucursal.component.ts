
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SucursalService } from '../services/sucursal.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Sucursal } from '../models/sucursal.model';
import { MatSort,MatSortModule } from '@angular/material/sort';




@Component({
  selector: 'app-sucursal',
  standalone: true,
  imports: [CommonModule,MatTableModule,MatSortModule],
  templateUrl: './sucursal.component.html',
  styleUrl: './sucursal.component.scss'
})
export class SucursalComponent {
  displayedColumns:string[]=['sucursalId','sucursalName','sucursalAddres','creationDate','companyId']
  dataSource = new MatTableDataSource<Sucursal>();
  
  @ViewChild(MatSort) sort!:MatSort;
  
  constructor(private sucursalService:SucursalService){}

  
  ngOnInit():void{
    this.sucursalService.getSucursales().subscribe({
      next:(data: Sucursal[])=>{
        console.log('Datos de sucursales recibidos:', data);
        this.dataSource.data=data.map(item=> new Sucursal(item));
        this.dataSource.sort = this.sort;
      }, 
      error:(error)=>{
        console.error('Error al obtener sucursales ', error)
      }
    });

  }

}


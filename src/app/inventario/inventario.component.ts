
import { StockDto } from './../models/stockDto.model';
import { InventarioService } from './../services/inventario.service';
import { Component,OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';


@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.scss'
})

export class InventarioComponent implements OnInit{

  
  displayedColumns: string[] = ['stockId', 'sucursalName', 'companyName', 'productName', 'cantidad', 'status', 'estadoLoteNombre', 'creationDate'];
  dataSource = new MatTableDataSource<StockDto>();

  @ViewChild(MatSort) sort!:MatSort;

  constructor (private inventarioService:InventarioService){}

  ngOnInit(): void {
    this.inventarioService.getStockList().subscribe({
      next:(data:StockDto[])=>{
        this.dataSource.data=data.map(item=> new StockDto(item));
        this.dataSource.sort=this.sort;
        console.log('Datos recibidos:', data);
      },
      error:(error)=>{
        console.error('Error al obtener Productos',error)
      }
    });
  }
}

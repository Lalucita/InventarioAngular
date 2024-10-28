import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyService  } from '../services/company.service';
import { Company } from '../models/company.model'; // Importamos el modelo
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';


@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule,MatTableModule,MatSortModule],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss'
})

export class CompanyComponent implements OnInit{
  displayedColumns:string[]=['companyId','companyName','creationDate']
  dataSource= new MatTableDataSource<Company>();

  @ViewChild(MatSort) sort!:MatSort;

  constructor(private companyService :CompanyService ){}

  ngOnInit(): void {
    this.companyService .getCompanies().subscribe({
      next:(data: Company[])=>{
        this.dataSource.data=data.map(item=>new Company(item));
        this.dataSource.sort=this.sort;
      },
      error:(error)=>{
        console.error('Error al obtener compañias',error)
      }
    });
  }
}

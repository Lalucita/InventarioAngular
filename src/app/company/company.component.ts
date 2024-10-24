import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyService  } from '../services/company.service';
import { Company } from '../models/company.model'; // Importamos el modelo
import { TableComponent } from '../modules/table/components/table/table.component';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule,TableComponent],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss'
})
export class CompanyComponent implements OnInit{
  displayedColumns:string[]=['companyId','companyName','creationDate']
  dataSource: Company[]=[]

  constructor(private companyService :CompanyService ){}

  ngOnInit(): void {
    this.companyService .getCompanies().subscribe({
      next:(data: Company[])=>{
        this.dataSource=data.map(item=>new Company(item));
      },
      error:(error)=>{
        console.error('Error al obtener compañias',error)
      }
    });
  }
}

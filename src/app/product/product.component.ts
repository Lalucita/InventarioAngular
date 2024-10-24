import { ProductService } from './../services/product.service';
import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../models/product.model';
import { TableComponent } from '../modules/table/components/table/table.component';
import { MatTableModule } from '@angular/material/table';



@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,MatTableModule, TableComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{
  displayedColumns:string[]=['productId','name','description','sku','companyId']
  dataSource:Product[]=[]

  constructor( private productService:ProductService){}


  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next:(data:Product[])=>{
        this.dataSource=data.map(item=> new Product(item));
      },
      error:(error)=>{
        console.error('Error al obtener Productos',error)
      }
    });
  }
}


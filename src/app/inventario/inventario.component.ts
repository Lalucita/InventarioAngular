import { CompanyService } from './../services/company.service';
import { StockDto } from './../models/stockDto.model';
import { InventarioService } from './../services/inventario.service';
import { Component,OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { Company } from '../models/company.model';

import { Sucursal } from '../models/sucursal.model';
import { SucursalService } from '../services/sucursal.service';

import { FormControl,ReactiveFormsModule  } from '@angular/forms';

import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, PageEvent  } from '@angular/material/paginator';








@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule
            ,MatTableModule
            ,MatSortModule
            ,MatSelectModule
            ,MatAutocompleteModule
            ,ReactiveFormsModule
            ,MatFormFieldModule
            ,MatPaginator
  ],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.scss'
})

export class InventarioComponent implements OnInit{
  companyID:string="";
  sucursalID:string="";
  
  displayedColumns: string[] = ['stockId', 'sucursalName', 'companyName', 'productName', 'cantidad', 'status', 'estadoLoteNombre', 'creationDate'];
  dataSource = new MatTableDataSource<StockDto>();

  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Variables para la paginación
  totalRows = 0; // Total de filas en el servidor
  pageSize = 2; // Tamaño de la página
  currentPage = 0; // Página actual

  //Datos para el combo box
  companies: Company[]=[];
  selectedCompany:Company | null = null;  // Valor seleccionado en el combo box
  sucursales: Sucursal[]=[]; //Lista de sucursales filtradas por compañia 
  selectedSucursal: Sucursal | null = null;

  // Control de búsqueda para productos
  productControl = new FormControl('');
  filteredProducts: Observable<StockDto[]> = of([]);

  constructor (private inventarioService:InventarioService, 
                private companyService: CompanyService, 
                private sucursalService:SucursalService){}

  ngOnInit(): void {
    // Obtener la lista de compañias 
    this.companyService .getCompanies().subscribe({
      next:(data: Company[])=>{
        this.companies=data;
      },
      error: ( error)=>{
        console.error('Error al obtener las compañías:', error);
      }
    });
    
    //Obtener datos del inventario
    this.inventarioService.getStockList().subscribe({
      next:(data:StockDto[])=>{
        this.dataSource.data=data.map(item=> new StockDto(item));
        this.dataSource.sort=this.sort;
      },
      error:(error)=>{
        console.error('Error al obtener Productos',error)
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort=this.sort;
    this.dataSource.paginator = this.paginator;
  }


 

  onCompanyChange(event: any){
    this.companyID=event.value;
    console.log('Compañía seleccionada:', this.companyID);

    // Llamar al servicio para obtener sucursales por compañìa
    this.sucursalService.getSucursalesByCompanyID(this.companyID).subscribe({
      next:(sucursales:Sucursal[])=>{
        this.sucursales=sucursales;
        console.log('Sucursales recibidas:', sucursales);
      },
      error:(error)=>{
        console.error('Error al obtener sucursales: ', error)
        this.sucursales=[];
        this.dataSource.data=[];
      }
    });
  }


  onSucursalChange(event: any){
    this.sucursalID=event.value; 
    console.log('Sucursal seleccionada:', this.sucursalID);

    this.inventarioService.getInventarioStockProducto(this.companyID,this.sucursalID,1,2).subscribe({
      next:(response:{results: StockDto[]; RowsCount: number; PageCount:number; PageSize:number;
        CurrentPage?:number})=>{
        console.log('Datos recibidos del API:', response);
          this.dataSource.data=response.results.map(item=> new StockDto(item));
          this.dataSource.sort=this.sort;
          
    
          

      },
      error:(error)=>{
        console.error('Error al obtener Productos',error);
        this.dataSource.data=[];
      }
    });
  }

  // Llamada al API para cargar datos
  loadData(): void {
    const apiPage = this.currentPage + 1; // Ajusta la página para el API
    console.log(`Cargando datos: Página del paginador: ${this.currentPage}, Página API: ${apiPage}`);

    console.log(' Cmpañia:', this.companyID);
    console.log(' Sucursal:', this.sucursalID);
    console.log(' Current page para cargar datos:', this.currentPage);
    this.inventarioService.getInventarioStockProducto(this.companyID,this.sucursalID, 
                                                      apiPage,this.pageSize).subscribe({
      next:(response:{results: StockDto[]; rowsCount: number; PageCount:number; PageSize:number;
        currentPage:number})=>{
        console.log('Datos recibidos del API:', response);
          this.dataSource.data=response.results.map(item=> new StockDto(item));
          this.dataSource.sort=this.sort;
          
          this.totalRows=response.rowsCount;
          this.currentPage=response.currentPage;

          console.log(' Rows Count:', this.totalRows);
          console.log(' Current page:', this.currentPage);

           // Reasignar paginador después de la actualización
          this.dataSource.paginator = this.paginator;
          
      },
      error:(error)=>{
        console.error('Error al obtener Productos',error);
        this.dataSource.data=[];
      }
    });  
  }

    // Manejar el cambio de página
    onPageChange(event: PageEvent): void {
      console.log('Evento de paginación:', event);
      this.currentPage = event.pageIndex; // Actualiza la página actual
      this.pageSize = event.pageSize; // Actualiza el tamaño de la página
      this.loadData(); // Vuelve a cargar los datos con la nueva página
    }

}

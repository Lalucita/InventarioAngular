import { CompanyService } from './../services/company.service';
import { StockDto } from './../models/stockDto.model';
import { InventarioService } from './../services/inventario.service';
import { Component,OnInit, ViewChild } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { Company } from '../models/company.model';

import { Sucursal } from '../models/sucursal.model';
import { SucursalService } from '../services/sucursal.service';

import { FormControl,ReactiveFormsModule ,FormsModule } from '@angular/forms';

import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { MatPaginator, MatPaginatorModule, PageEvent  } from '@angular/material/paginator';
import { ProductName } from '../models/productName';











@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule
            ,MatTableModule
            ,MatSortModule
            ,MatSelectModule
            ,MatPaginator
            ,MatAutocompleteModule
            ,ReactiveFormsModule
            ,MatFormFieldModule
            ,AsyncPipe
            ,FormsModule
            ,MatInputModule
            ,MatPaginatorModule
  ],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.scss'
})

export class InventarioComponent implements OnInit{
  companyID:string="";
  sucursalID:string="";
  productName="";

  myControl=new FormControl('');
  options:string[]=[];
  filteredOptions:Observable<string[]> = of([]);

  
  displayedColumns: string[] = ['stockId', 'sucursalName', 'companyName', 'productName', 'cantidad', 'status', 'estadoLoteNombre', 'creationDate'];
  dataSource = new MatTableDataSource<StockDto>();

  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator ;

  // Variables para la paginación
  totalRows = 0; // Total de filas en el servidor
  pageSize = 2; // Tamaño de la página
  currentPage = 0; // Página actual

  //Datos para el combo box
  companies: Company[]=[];
  selectedCompany:Company | null = null;  // Valor seleccionado en el combo box
  sucursales: Sucursal[]=[]; //Lista de sucursales filtradas por compañia 
  selectedSucursal: Sucursal | null = null;

  

  
  constructor (private inventarioService:InventarioService, 
                private companyService: CompanyService, 
                private sucursalService:SucursalService){}

  ngOnInit(): void {
    this.filteredOptions=this.myControl.valueChanges.pipe(
      startWith(''),
      map(value=>this._filter(value|| ''))
    );

    // Obtener la lista de compañias 
    this.companyService .getCompanies().subscribe({
      next:(data: Company[])=>{
        this.companies=data;
      },
      error: ( error)=>{
        console.error('Error al obtener las compañías:', error);
      }
    });
    
    this.loadData();

  }

  trackByProductId(index: number, product: ProductName): string {
    return product.productID; // Retorna una clave única (productID)
  }
  
  private _filter(value:string):string[]{
    const filterValue=value.toLowerCase();
    return this.options.filter(
      option=>option.toLowerCase().includes(filterValue));
  }




  ngAfterViewInit() {
    this.dataSource.sort=this.sort;
    //this.dataSource.paginator = this.paginator;
    //this.paginator.page.subscribe(
      //(event) => console.log(event));
    //console.log('Paginator inicializado:', this.paginator);
  }


 

  onCompanyChange(event: any){
    this.companyID=event.value;
    console.log('Compañía seleccionada:', this.companyID);

    // Llamar al servicio para obtener sucursales por compañìa
    this.sucursalService.getSucursalesByCompanyID(this.companyID).subscribe({
      next:(sucursales:Sucursal[])=>{
        this.sucursales=sucursales;
        console.log('Sucursales recibidas:', sucursales);
        this.options=[]
        this.myControl.setValue('');

        
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

    this.inventarioService.getProductoByCompanyAndSucursal
    (this.companyID,this.sucursalID,"").subscribe({
      next:(productN:string[])=>{
        this.options=[]
        this.myControl.setValue('');
        if(productN.length==0){
          this.options=[];
        }else{
          console.log('productos seleccionados`:', productN);
          this.options=productN;
          this.productName="";
          //this.loadData();
        }
      }, 
      error:(error)=>{
        console.error('Error al obtener los nombres de los productos: ',error);
      }
    });

  }


  onProductSelected(event: any): void {
    const selectedOption = event.option.value; // Valor seleccionado
    console.log('Opción seleccionada:', selectedOption);
    // Llama aquí a cualquier método adicional
    this.productName=selectedOption;
    this.loadData();
  }

  // Llamada al API para cargar datos
  loadData(): void {
    const apiPage = this.currentPage + 1; // Ajusta la página para el API
    console.log(`Cargando datos: Página del paginador: ${this.currentPage}, Página API: ${apiPage}`);

    this.inventarioService.getInventarioStockProducto2(this.companyID,this.sucursalID, this.productName,
                                                      apiPage, this.pageSize).subscribe({  
      next:(response:{results: StockDto[]; rowsCount: number; PageCount:number; PageSize:number;
        currentPage:number})=>{
        console.log('Datos recibidos del API:', response);
          this.dataSource.data=response.results.map(item=> new StockDto(item));
  
          this.dataSource.sort=this.sort;
          this.totalRows=response.rowsCount;
          //this.currentPage=response.currentPage;
          //this.pageSize=response.PageSize;

          
          console.log(' Rows Count:', this.totalRows);
          console.log(' Current page:', this.currentPage);

          console.log('Paginator Length (totalRows):', this.paginator.length);
          console.log('Paginator Page Size:', this.paginator.pageSize);
          console.log('Paginator Page Index:', this.paginator.pageIndex);

  
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
      if (this.currentPage !== event.pageIndex || this.pageSize !== event.pageSize) {
        this.currentPage = event.pageIndex; // Actualiza el índice de página
        this.pageSize = event.pageSize;  
        console.log('Tamaño de la pàgina:', this.pageSize);
          // Actualiza el tamaño de página
        this.loadData(); // Recarga los datos
      }
    }

}

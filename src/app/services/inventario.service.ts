import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class InventarioService {
    private apiUrl='http://localhost:5299/api'
        
    constructor(private http: HttpClient){
    
    }


    getStockList(): Observable<any> {
        return this.http.get(`${this.apiUrl}/Inventario/GetAll`);
    }
    
    getInventarioProductoList(): Observable<any> {
        return this.http.get(`${this.apiUrl}/Inventario/GetInventarioProducto`);
    }

    
    getInventarioStockProducto(companyID: string, sucursalID:string , currentPage:number, pageSize:number):Observable<any>{
        const datos={
                companyId: companyID,
                sucursalId: sucursalID,
                SortDir:"asc",
                SortProperty:"ProductName",
                CurrentPage:currentPage,
                PageSize:pageSize
        };
        console.log(datos)
        return this.http.post(`${this.apiUrl}/Inventario/GetInventarioByCAndS`, datos)
        
    }

    getInventarioStockProducto2(companyID: string, sucursalID:string , nombreProduct:string,currentPage:number, pageSize:number):Observable<any>{
        const datos={
                companyId: companyID,
                sucursalId: sucursalID,
                nombreProduct:nombreProduct,
                SortDir:"asc",
                SortProperty:"ProductName",
                CurrentPage:currentPage,
                PageSize:pageSize
        };
        console.log(datos)
        return this.http.post(`${this.apiUrl}/Inventario/GetInventarioByCAndSandProduct`, datos)
        
    }



    getInventarioStockProducto1(companyID: string, sucursalID:string , productName: string,currentPage:number, pageSize:number):Observable<any>{
        const datos={
                companyId: companyID,
                sucursalId: sucursalID,
                nombreProduct:productName,
                SortDir:"asc",
                SortProperty:"ProductName",
                CurrentPage:currentPage,
                PageSize:pageSize
        };
        console.log(datos)
        return this.http.post(`${this.apiUrl}/Inventario/GetInventarioByCAndSandProduct`, datos)
        
    }



    getProductoByCompanyAndSucursal(companyID: string, sucursalID:string , productN:string):Observable<any>{
        const datos={
            companyId: companyID,
            sucursalId: sucursalID,
            productName: productN
        };
        return this.http.post(`${this.apiUrl}/Inventario/GetProductsByCAndS`, datos)
    }
    
}


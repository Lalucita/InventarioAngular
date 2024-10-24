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
    getStockList():Observable<any>{
        return this.http.get(`${this.apiUrl}/Inventario`);
    }
    
}


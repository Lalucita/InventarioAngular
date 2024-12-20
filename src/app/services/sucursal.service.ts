import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SucursalService {
    private apiUrl='http://localhost:5299/api'
        
    constructor(private http: HttpClient){
    
    }

    getSucursales():Observable<any>{
        return this.http.get(`${this.apiUrl}/Sucursal`);
    }

    getSucursalesByCompanyID(companyID: string): Observable<any>{
        return this.http.get(`${this.apiUrl}/Sucursal/by-company/${companyID}`);
    }
    
}


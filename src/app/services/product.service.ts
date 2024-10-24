import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiUrl='http://localhost:5299/api'
        
    constructor(private http: HttpClient){
    
    }
    getProducts():Observable<any>{
        return this.http.get(`${this.apiUrl}/Product`);
    }
    
}

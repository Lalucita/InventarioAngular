import { SidebarComponent } from './sidebar/sidebar.component';
import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyService } from './services/company.service';
import { RouterModule } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { SucursalComponent } from './sucursal/sucursal.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule
            , CommonModule
            , SidebarComponent
            , CompanyComponent
            ,SucursalComponent
            , MatToolbarModule
            ,MatIconModule
            ,MatButtonModule],
  templateUrl: 
    './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Proyecto de Inventario';
  companies:any[]=[];
  
  constructor(private companyService: CompanyService){}

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe (
      (data)=>{
        this.companies=data;
      },
      (error)=>{
        console.error('Error fetching companies:',error);
      }
    );
  }
}

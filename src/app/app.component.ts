import { SidebarComponent } from './sidebar/sidebar.component';
import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyService } from './services/company.service';
import { RouterModule } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { TableComponent } from "./modules/table/components/table/table.component";
import { SucursalComponent } from './sucursal/sucursal.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule
            , CommonModule
            , SidebarComponent
            , CompanyComponent
            , TableComponent
            ,SucursalComponent],
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

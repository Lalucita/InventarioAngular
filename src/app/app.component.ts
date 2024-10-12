import { Component ,OnInit} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { error } from 'console';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'inventarioProyecto';
  companies:any[]=[];
  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    this.apiService.getCompanies().subscribe (
      (data)=>{
        this.companies=data;
        console.log('Companies',this.companies);
      },
      (error)=>{
        console.error('Error fetching companies:',error);
      }
    );
  }
}

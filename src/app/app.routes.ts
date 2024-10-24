import { MotivoMovimientoComponent } from './motivo-movimiento/motivo-movimiento.component';
import { Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { SucursalComponent } from './sucursal/sucursal.component';
import { ProductComponent } from './product/product.component';
import { InventarioComponent } from './inventario/inventario.component';



export const routes: Routes = [
    {path:'company',component : CompanyComponent},
    {path:'sucursal',component:SucursalComponent},
    {path:'product',component:ProductComponent},
    {path:'motivoMovimiento',component:MotivoMovimientoComponent},
    {path:'inventario',component:InventarioComponent},
    {path: '', redirectTo:'company', pathMatch:'full'},
    
];


import { stat } from "node:fs";

export class StockDto {
    stockId: string;
    sucursalName: string;
    companyName: string;
    productName: string;
    cantidad:number;
    status:number;
    estadoLoteNombre: string;
    creationDate: Date;
  
    constructor(data: Partial<StockDto> = {}) {
      this.stockId = data.stockId || '';
      this.sucursalName = data.sucursalName || '';
      this.companyName = data.companyName || '';
      this.productName = data.productName || '';
      this.cantidad=data.cantidad||0;
      this.status=data.status||0;
      this.estadoLoteNombre = data.estadoLoteNombre || '';
      this.creationDate = data.creationDate ? new Date(data.creationDate) : new Date();
    }
  }
  
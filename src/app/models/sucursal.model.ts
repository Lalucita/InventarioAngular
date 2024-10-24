export class Sucursal {
  sucursalId: string;
  sucursalName: string;
  sucursalDescription: string;
  sucursalAddres: string;
  latitud: number;
  longitud: number;
  creationDate: Date;
  lastModifiedDate: Date;
  companyId: string;

  constructor(data: Partial<Sucursal> = {}) {
    this.sucursalId = data.sucursalId || '';
    this.sucursalName = data.sucursalName || '';
    this.sucursalDescription = data.sucursalDescription || '';
    this.sucursalAddres = data.sucursalAddres || '';
    this.latitud = data.latitud || 0;
    this.longitud = data.longitud || 0;
    this.creationDate = data.creationDate ? new Date(data.creationDate) : new Date();
    this.lastModifiedDate = data.lastModifiedDate ? new Date(data.lastModifiedDate) : new Date();
    this.companyId = data.companyId || '';
  }
}

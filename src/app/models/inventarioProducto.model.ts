export class InventarioProducto {
    inventarioProductoId: string;
    sucursalId: string;
    companyID: string;
    productId: string;
    sucursalName: string;
    companyName: string;
    productName: string;
    cantidad: number;
    fechaVenc: Date;
    estadoLoteNombre: string;
    creationDate: Date;
    status: number;
    nroLote: string;

    constructor(data: Partial<InventarioProducto> = {}) {
        this.inventarioProductoId = data.inventarioProductoId || '';
        this.sucursalId = data.sucursalId || '';
        this.companyID = data.companyID || '';
        this.productId = data.productId || '';
        this.sucursalName = data.sucursalName || '';
        this.companyName = data.companyName || '';
        this.productName = data.productName || '';
        this.cantidad = data.cantidad ?? 0;
        this.fechaVenc = data.fechaVenc ? new Date(data.fechaVenc) : new Date();
        this.estadoLoteNombre = data.estadoLoteNombre || '';
        this.creationDate = data.creationDate ? new Date(data.creationDate) : new Date();
        this.status = data.status ?? 0;
        this.nroLote = data.nroLote || '';
    }
}

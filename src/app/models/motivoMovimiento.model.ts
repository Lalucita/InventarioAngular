export class MotivoMovimiento {
    motivoMovimientoID: string;
    motivoName: string;
    creationDate: Date;
    lastModifiedDate: Date;

    constructor(data: Partial<MotivoMovimiento>={}){
        this.motivoMovimientoID=data.motivoMovimientoID||'';
        this.motivoName=data.motivoName||'';
        this.creationDate=data.creationDate? new Date(data.creationDate):new Date();
        this.lastModifiedDate=data.lastModifiedDate? new Date(data.lastModifiedDate):new Date();
    }
}


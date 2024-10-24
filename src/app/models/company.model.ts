export class Company {
    companyId: string;
    companyName: string;
    companyDescription: string;
    creationDate: Date;
    lastModifiedDate: Date;
  
    constructor(data: Partial<Company> = {}) {
      this.companyId = data.companyId || '';
      this.companyName = data.companyName || '';
      this.companyDescription = data.companyDescription || '';
      this.creationDate = data.creationDate ? new Date(data.creationDate) : new Date();
      this.lastModifiedDate = data.lastModifiedDate ? new Date(data.lastModifiedDate) : new Date();
    }
  }
  
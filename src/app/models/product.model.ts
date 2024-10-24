export class Product {
    productId: string;
    name: string;
    description: string;
    sku: string;
    createdAt: Date;
    modificationDate: Date;
    companyId: string;
  
    constructor(data: Partial<Product> = {}) {
      this.productId = data.productId || '';
      this.name = data.name || '';
      this.description = data.description || '';
      this.sku = data.sku || '';
      this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
      this.modificationDate = data.modificationDate ? new Date(data.modificationDate) : new Date();
      this.companyId = data.companyId || '';
    }
  }
  
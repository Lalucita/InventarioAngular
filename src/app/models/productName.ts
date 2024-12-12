export class ProductName {
    productID: string;
    productName: string;
  
    constructor(data: Partial<ProductName> = {}) {
      this.productID = data.productID || '';
      this.productName = data.productName || '';
    }
  }
  
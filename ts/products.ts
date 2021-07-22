// singleton for products

export class Product {
  private static instance: Product;
  static productList = [];

  protected category: string

  private constructor() {}

  public static getProductInstance(): Product {
    if(!Product.instance) {
      Product.instance = new Product()
    }

    return Product.instance
  }

  public getProductList(): any {
    return Product.productList;
  }

  public setProductList(list: any) {
    Product.productList = list;
  }

  public addConfigProduct(product: any): void {
    let list = this.getProductList();

    let index = list.findIndex((item: any) => item.code === product.code)

    if(index >= 0) {
      list[index].count += 1;
    }
    else {
      list.push(product)
    }

    this.setProductList(list);
  }

  public removeProduct(code: string): void {
    let list = Product.productList;

    let index = list.findIndex((item: any) => item.code === code)

    if(index >= 0) {
      if(list[index].count > 1) {
        list[index].count -= 1;
      } else {
        list = list.filter((item: any) => item.code !== code)
      }

      this.setProductList(list)
    }
  }

  public getProduct(code: string): any {
    let list = Product.productList;

    let product = list.find((item: any) => {
      if(item.code === code) {
        return item
      }
    })

    return product;
  }
}
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
      list[index].count += product.count;
    }
    else {
      list.push(product)
    }

    this.setProductList(list);
  }

  public updateProduct(code: string, count: number, price: number): void {
    let list = this.getProductList();

    let index = list.findIndex((item: any) => item.code === code)

    if(index >= 0) {
      list[index].count = count;
      list[index].price = price;
    }
    
    this.setProductList(list);
  }

  public removeProduct(code: string): any {
    let list = [...Product.productList];

    let index = list.findIndex((item: any) => item.code === code)

    if(index >= 0) {
      if(list[index].count > 1) {
        list[index].count -= 1;
      } else {
        list = list.filter((item: any) => item.code !== code)
      }
    }
    this.setProductList(list)
  }

  public deleteProduct(code: string): boolean {
    let list = Product.productList;

    let index = list.findIndex((item: any) => item.code === code)

    if(index >= 0) {
      list = list.filter((item: any) => item.code !== code)

      this.setProductList(list)

      return true;
    } else return false;
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

export function productInit() {
  let product = Product.getProductInstance();

  let p1 = new Object({
    name: "Coke",
    price: 40,
    code: "101",
    count: 5
  });

  product.addConfigProduct(p1);

  let p2 = new Object({
    name: "Pringles",
    price: 100,
    code: "201",
    count: 5
  });

  product.addConfigProduct(p2);

  let p3 = new Object({
    name: "Snikers",
    price: 60,
    code: "301",
    count: 5
  });

  product.addConfigProduct(p3)
}
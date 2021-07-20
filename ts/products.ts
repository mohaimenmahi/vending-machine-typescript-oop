// singleton for products

export class Product {
  private static instance: Product;
  private static productList: Product[];

  protected name: string;
  protected price: number;
  protected code: string;
  protected count: number;
  protected category: string

  private constructor() {}

  public static getProductInstance(): Product {
    if(!Product.instance) {
      Product.instance = new Product()
    }

    return Product.instance
  }

  public static addConfigProduct(product: Product): void {
    let list: Product[] = Product.productList;

    let index = list.findIndex((item: Product) => item.code === product.code)

    if(index >= 0) {
      Product.productList[index].count += 1;
    }
    else {
      Product.productList.push(product)
    }
  }

  public static removeProduct(code: string): void {
    let list: Product[] = Product.productList;

    let index = list.findIndex((item:Product) => item.code === code)

    if(index >= 0) {
      if(Product.productList[index].count > 1) {
        Product.productList[index].count -= 1;
      } else {
        Product.productList = Product.productList.filter((item: Product) => item.code !== code)
      }
    }
  }

  public static getProduct(code: string): Product {
    let list: Product[] = Product.productList;

    let product = list.find((item: Product) => {
      if(item.code === code) {
        return item
      }
    })

    return product;
  }

  public static getProductList(): Product[] {
    return Product.productList;
  }
}
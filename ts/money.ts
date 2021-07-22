// singleton for money

export class Money {
  private static instance: Money;
  static moneyList = [];

  private constructor() {}

  public static getMoneyInstance(): Money {
    if(!Money.instance) {
      Money.instance = new Money();
    }

    return Money.instance
  }

  public getMoneyList(): any {
    return Money.moneyList; 
  }

  public setStaticArray(list: any): void {
    Money.moneyList = list
  }

  private convertString(money: any): string {
    let code = money.composition.toUpperCase()
      +'-' 
      + money.color.toUpperCase() 
      + '-' 
      + money.obverse.toUpperCase()
      + '-'
      + money.reverse.toUpperCase()

    return code;
  }

  // admin will add the codes, value and count 
  public addConfigMoney(money: any): void {
    let list = this.getMoneyList();
    
    let index = list.findIndex((item: any) => 
      this.convertString(item) === this.convertString(money)
    )

    if(index >= 0) {
      list[index].count += money.count;
    } else {
      list.push(money)
    }

    this.setStaticArray(list)
  }

  public insertMoney(code: string): any {
    let list = this.getMoneyList();

    let index = list.findIndex((item: any) => 
      this.convertString(item) === code.toUpperCase()
    )

    if(index >= 0) {
      list[index].count += 1;
      this.setStaticArray(list)
      return list;
    }
  }

  public returnMoney(value: number): boolean {
    let list = this.getMoneyList();

    list = list.sort(
      (a: any, b: any) => a.value < b.value ? -1 : 1
    )

    let len = list.length;

    let remain = value

    let i = len - 1;

    while(remain > 0) {
      if(i < 0) break;
      if(list[i].value > remain) i--;
      else {
        let div = Math.floor(remain / list[i].value);
        if(list[i].count >= div) {
          remain = remain % list[i].value;
          list[i].count -= div;
        } else i--;
      }
    }

    if(remain === 0) {
      this.setStaticArray(list);
      return true;
    } else {
      return false;
    }
  }

}
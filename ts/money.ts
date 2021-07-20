// singleton for money

export class Money {
  private static instance: Money;
  private static moneyList: Money[];

  protected composition: string;
  protected color: string;
  protected obverse: string;
  protected reverse: string;
  protected value: number;
  protected count: number;
  protected type: string;

  private constructor() {}

  public static getMoneyInstance(): Money {
    if(!Money.instance) {
      Money.instance = new Money();
    }

    return Money.instance
  }

  private static convertString(money: Money): string {
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
  public static addConfigMoney(money: Money): void {
    let list: Money[] = Money.moneyList;
    
    let index = list.findIndex((item: Money) => 
      this.convertString(item) === this.convertString(money)
    )

    if(index >= 0) {
      Money.moneyList[index].count += money.count;
    } else {
      Money.moneyList.push(money)
    }
  }

  public static insertMoney(code: string): any {
    let list: Money[] = Money.moneyList;

    let index = list.findIndex((item: Money) => 
      this.convertString(item) === code.toUpperCase()
    )

    if(index >= 0) {
      Money.moneyList[index].count += 1;
      return Money.moneyList[index];
    }
  }

  public static returnMoney(value: number): boolean {
    let list: Money[] = Money.moneyList;

    list = list.sort(
      (a: Money, b: Money) => a.value < b.value ? -1 : 1
    )

    let len = list.length;

    let remain = value

    let i = len - 1;

    while(remain > 0) {
      if(i < 0) break;
      if(list[i].value > remain) i--;
      else {
        let div = remain / list[i].value;
        if(list[i].count >= div) {
          remain = remain % list[i].value;
          list[i].count -= div;
        } else i--;
      }
    }

    if(remain === 0) {
      Money.moneyList = list;
      return true;
    } else {
      return false;
    }
  }

  public static getMoneyList(): Money[] {
    return Money.moneyList;
  }
}
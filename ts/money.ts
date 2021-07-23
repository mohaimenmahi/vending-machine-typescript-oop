// singleton for money

function calculateReturn(remain: number, list: any) {
  let len = list.length;

    let i = len - 1;

    while(remain > 0) {
      if(i < 0) break;
      if(list[i].value > remain) i--;
      else {
        if(list[i].count > 0) {
          remain -= list[i].value;
          list[i].count -= 1;
        } else i--;
      }
    }

    return { remain, list }
}

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
    list = list.sort(
      (a: any, b: any) => a.value < b.value ? -1 : 1
    )
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

  public removeConfigMoney(code: string): boolean {
    let list = this.getMoneyList();

    let index = list.findIndex((item: any) => 
      this.convertString(item) === code.toUpperCase()
    )

    if(index >= 0) {
      list[index].count = 0;
      this.setStaticArray(list);
      return true;
    } else {
      return false;
    }
  }

  public updateMoney(code: string, count: number): any {
    let list = this.getMoneyList();

    let index = list.findIndex((item: any) => 
      this.convertString(item) === code.toUpperCase()
    )

    if(index >= 0) {
      list[index].count = count;
      this.setStaticArray(list)
      return list[index];
    } else {
      return null;
    }
  }

  public insertMoney(code: string): any {
    let list = this.getMoneyList();

    let index = list.findIndex((item: any) => 
      this.convertString(item) === code.toUpperCase()
    )

    if(index >= 0) {
      list[index].count += 1;
      this.setStaticArray(list)
      return list[index];
    } else {
      return null;
    }
  }

  public returnMoney(value: number): boolean {
    let list = JSON.parse(JSON.stringify(this.getMoneyList()));

    let retObj = calculateReturn(value, list)

    let remain = retObj.remain;
    let newList = retObj.list;

    if(remain === 0) {
      this.setStaticArray(newList);
      return true;
    } else {
      let reverseList = JSON.parse(JSON.stringify(this.getMoneyList()))
      reverseList= reverseList.sort(
        (a: any, b: any) => a.value < b.value ? 1 : -1
      )

      let newRet = calculateReturn(value, reverseList);

      let newRem = newRet.remain;
      let newRetList = newRet.list;

      if(newRem === 0) {
        this.setStaticArray(newRetList)
        return true
      } else {
        return false;
      }
    }
  }

}

export function init() {
  let m = Money.getMoneyInstance();

  let m1 = new Object({
    composition: "STEEL",
    color: 'SILVER',
    obverse: "EDUCATION",
    reverse: "SHAPLA",
    value: 2,
    count: 0,
    type: "coin"
  })
  
  m.addConfigMoney(m1)

  let m2 = new Object({
    composition: "STEEL",
    color: 'SILVER',
    obverse: "JAMUNA",
    reverse: "SHAPLA",
    value: 5,
    count: 0,
    type: "coin"
  })

  m.addConfigMoney(m2);

  let m3 = new Object({
    composition: "PAPER",
    color: "PINK",
    obverse: "BB",
    reverse: "BMM",
    value: 10,
    count: 0,
    type: "note"
  });

  m.addConfigMoney(m3);

  let m4 = new Object({
    composition: "PAPER",
    color: "GREEN",
    obverse: "BB",
    reverse: "SDM",
    value: 20,
    count: 0,
    type: "note"
  });

  m.addConfigMoney(m4);

}

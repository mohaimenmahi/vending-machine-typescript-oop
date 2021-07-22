// singleton for money

export class Money {
  private static instance: Money;
  static moneyList: Money[] = [];

  composition: string;
  color: string;
  obverse: string;
  reverse: string;
  value: number;
  count: number;
  type: string;

  private constructor() {
    
  }

  public static getMoneyInstance(): Money {
    if(!Money.instance) {
      Money.instance = new Money();
    }

    return Money.instance
  }

  public static getMoneyList(): Money[] {
    return Money.moneyList; 
  }

  public static setStaticArray(list: Money[]): void {
    if(Money.instance) {
      Money.moneyList = list
    }
  }

  private static convertString(money: any): string {
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
  public static addConfigMoney(money: any): void {
    let list: Money[] = this.getMoneyList();
    
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

  public static insertMoney(code: string): any {
    let list: Money[] = this.getMoneyList();

    let index = list.findIndex((item: Money) => 
      this.convertString(item) === code.toUpperCase()
    )

    if(index >= 0) {
      list[index].count += 1;
      this.setStaticArray(list)
      return list;
    }
  }

  public static returnMoney(value: number): boolean {
    let list: Money[] = this.getMoneyList();

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

function client() {
  let m1 = new Object({
    composition: "STEEL",
    color: 'SILVER',
    obverse: "EDUCATION",
    reverse: "SHAPLA",
    value: 2,
    count: 10,
    type: "coin"
  })
  
  Money.addConfigMoney(m1)

  let m2 = new Object({
    composition: "STEEL",
    color: 'SILVER',
    obverse: "JAMUNA",
    reverse: "SHAPLA",
    value: 5,
    count: 10,
    type: "coin"
  })

  Money.addConfigMoney(m2);

  let m3 = new Object({
    composition: "PAPER",
    color: "PINK",
    obverse: "BB",
    reverse: "BMM",
    value: 10,
    count: 10,
    type: "note"
  });

  Money.addConfigMoney(m3);

  console.log("Money after Configure: ", Money.getMoneyList());

  let code = "STEEL-SILVER-JAMUNA-SHAPLA"

  console.log("Money Inserted: ", Money.insertMoney(code));

  console.log("Money After Inserting: ",Money.getMoneyList());

  console.log("Money Returned: ", Money.returnMoney(12));

  console.log('Money After Return', Money.getMoneyList())
}

client()
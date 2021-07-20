// singleton for money
class Money {
  constructor() {}
  static getMoneyInstance() {
    if (!Money.instance) {
      Money.instance = new Money();
    }
    return Money.instance;
  }
  static convertString(money) {
    let code =
      money.composition.toUpperCase() +
      "-" +
      money.color.toUpperCase() +
      "-" +
      money.obverse.toUpperCase() +
      "-" +
      money.reverse.toUpperCase();
    return code;
  }
  // admin will add the codes, value and count
  static addConfigMoney(money) {
    let list = Money.moneyList;
    let index = list.findIndex(
      (item) => this.convertString(item) === this.convertString(money)
    );
    if (index >= 0) {
      Money.moneyList[index].count += money.count;
    } else {
      Money.moneyList.push(money);
    }
  }
  static insertMoney(code) {
    let list = Money.moneyList;
    let index = list.findIndex(
      (item) => this.convertString(item) === code.toUpperCase()
    );
    if (index >= 0) {
      Money.moneyList[index].count += 1;
      return Money.moneyList[index];
    }
  }
  static returnMoney(value) {
    let list = Money.moneyList;
    list = list.sort((a, b) => (a.value < b.value ? -1 : 1));
    let len = list.length;
    let remain = value;
    let i = len - 1;
    while (remain > 0) {
      if (i < 0) break;
      if (list[i].value > remain) i--;
      else {
        let div = remain / list[i].value;
        if (list[i].count >= div) {
          remain = remain % list[i].value;
          list[i].count -= div;
        } else i--;
      }
    }
    if (remain === 0) {
      Money.moneyList = list;
      return true;
    } else {
      return false;
    }
  }
  static getMoneyList() {
    return Money.moneyList;
  }
}

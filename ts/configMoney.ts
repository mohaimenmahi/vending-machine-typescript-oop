import { State } from "./state";
import {question} from 'readline-sync';
import { MoneyConfig } from "./configMoneyStore";
import { Money } from "./money";
import { ConfigMode } from "./configMode";

export class ConfigMoney extends State {
  public handleSelect(): string {
    let input: string = question("Money Store Mode (A = Config Money Store, B = Money Store Inventory): ")

    return input.toUpperCase();
  }

  public handleA(): void {
    this.context.transitionTo(new MoneyConfig())
  }

  public handleB(): void {
    let money = Money.getMoneyInstance();
    
    let allMoney = money.getMoneyList();

    let pc = 0, amount = 0;

    let len = allMoney.length;

    console.log("Type\tValue(Taka):\tQuantity(pcs)\t")
    for(let i = 0; i < len; i++) {
      let item = allMoney[i];

      pc += item.count;
      amount += item.value * allMoney[i].count;

      console.log(`${item.type}\t${item.value}\t\t${item.count}`)
    }
    console.log(`\t Total amount ${amount} Tk. and Quantity of coins and notes are ${pc} Pcs.`);

    this.context.transitionTo(new ConfigMode())
  }
}
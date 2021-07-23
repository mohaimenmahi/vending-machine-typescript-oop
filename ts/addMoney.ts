import { State } from "./state";
import {question, questionInt} from 'readline-sync'
import { Money } from "./money";
import { ConfigMode } from "./configMode";

export class AddMoney extends State {
  public handleSelect(): string {
    let input: string = question("Config Money (A = Add Money, B = Update Money Count): ")

    return input.toUpperCase()
  }

  public handleA(): void {
    console.log("Add new money by following: ");
    let type: string = question("Type (Coin/Note): ");
    let composition: string = question("Composition: ");
    let color: string = question("Color: ");
    let obverse: string = question("Obverse: ");
    let reverse: string = question("Reverse: ");
    let value: number = questionInt("Value: ");
    let count: number = questionInt("Count: ");

    let money = Money.getMoneyInstance();

    let m1 = new Object({
      composition: composition.toUpperCase(),
      color: color.toUpperCase(),
      obverse: obverse.toUpperCase(),
      reverse: reverse.toUpperCase(),
      value: value,
      count: count,
      type: type.toLowerCase()
    })

    money.addConfigMoney(m1)

    this.context.transitionTo(new AddMoney());
  }

  public handleB(): void {
    let money = Money.getMoneyInstance();

    let code: string = question("Enter Code: ");
    let count: number = questionInt("Enter Count: ");

    let isUpdate: any = money.updateMoney(code, count);

    if(isUpdate) {
      console.log("Money Index updated.")
    } else {
      console.log("Selected money not found.")
    }

    this.context.transitionTo(new AddMoney())
  }
}
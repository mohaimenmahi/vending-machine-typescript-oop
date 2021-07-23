import { State } from "./state";
import {question, questionInt} from 'readline-sync'
import { Money } from "./money";
import { ConfigMode } from "./configMode";
import { isString, validConvert } from "./validator";

export class AddMoney extends State {
  public handleSelect(): string {
    let input: string = question("Config Money (A = Add Money, B = Update Money Count): ")

    return input.toUpperCase()
  }

  public handleA(): void {
    console.log("Add new money by following: ");

    let type: string = question("Type (Coin/Note): ");
    type = validConvert(type)

    let composition: string = question("Composition: ");
    composition = validConvert(composition);

    let color: string = question("Color: ");
    color = validConvert(color)

    let obverse: string = question("Obverse: ");
    obverse = validConvert(obverse);

    let reverse: string = question("Reverse: ");
    reverse = validConvert(reverse)

    let value: number = questionInt("Value: ");
    let count: number = questionInt("Count: ");


    if(
      isString(type) && 
      isString(composition) && 
      isString(color) && 
      isString(obverse) && 
      isString(reverse) && 
      value > 0 && 
      count >= 0
    ) {
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

      money.addConfigMoney(m1);

      console.log("Money Added to the system!")
    } else {
      console.log("One or Many inputs are invalid.")
    }

    this.context.transitionTo(new AddMoney());
  }

  public handleB(): void {
    let money = Money.getMoneyInstance();

    let code: string = question("Enter Code: ");
    let count: number = questionInt("Enter Count: ");

    if(
      isString(code) &&
      count >= 0
    ) {
      let isUpdate: any = money.updateMoney(code, count);

      if(isUpdate) {
        console.log("Money Index updated.")
      } else {
        console.log("Selected money not found.")
      }
    } else {
      console.log("Input is not valid.")
    }

    this.context.transitionTo(new AddMoney())
  }
}
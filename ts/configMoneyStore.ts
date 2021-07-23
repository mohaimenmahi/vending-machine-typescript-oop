import { State } from "./state";
import {question} from 'readline-sync'
import { Money } from "./money";
import { AddMoney } from "./addMoney";
import { ConfigMode } from "./configMode";
import { isString, validConvert } from "./validator";

export class MoneyConfig extends State {
  public handleSelect(): string {
    let input: string = question("Config Money (A = Add/Update Money, B = Remove Money): ")

    return input.toUpperCase()
  }

  public handleA(): void {
    this.context.transitionTo(new AddMoney())
  }

  public handleB(): void {
    let money = Money.getMoneyInstance();

    let code: string = question("Enter code: ");
    code = validConvert(code);

    if(isString(code)) {
      let remove: boolean = money.removeConfigMoney(code) 
    
      if(remove) console.log("Money Removed successfully.")
      else console.log("Selected money is not available in System.")
    } else {
      console.log("Input is not valid.")
    }

    this.context.transitionTo(new MoneyConfig())
  }
}
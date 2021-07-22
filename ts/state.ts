// state of vending machine
import {VMContext} from './vending-machine'

export abstract class State {
  protected context: VMContext;

  public setContext(context: VMContext) {
    this.context = context;
  }

  public abstract handleA(): void;

  public abstract handleB(): void;

  public abstract handleSelect(): string;
}
import { Start } from "./start";
import { State } from "./state";

export class VMContext {
  private state: State;
  
  constructor(state: State) {
    this.transitionTo(state)
  }

  public transitionTo(state: State): void {
    this.state = state;
    this.state.setContext(this)
    this.takeInput()
  }

  public requestA(): void {
    this.state.handleA();
  }

  public requestB(): void {
    this.state.handleB();
  }

  public takeInput(): void {
    let option = this.state.handleSelect();
    if(option === 'A') {
      this.requestA();
    } else if(option === 'B') {
      this.requestB()
    } else if(option === 'C') {
      this.transitionTo(new Start())
    }
  }
}
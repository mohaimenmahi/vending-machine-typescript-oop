import { State } from "./state";

export class VMContext {
  private state: State;
  
  name: string;

  constructor(state: State) {
    this.transitionTo(state)
  }

  public transitionTo(state: State): void {
    this.state = state;
    this.state.setContext(this)
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
    }
  }
}
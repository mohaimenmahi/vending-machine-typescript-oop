"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VMContext {
    constructor(state) {
        this.transitionTo(state);
    }
    transitionTo(state) {
        this.state = state;
        this.state.setContext(this);
    }
    requestA() {
        this.state.handleA();
    }
    requestB() {
        this.state.handleB();
    }
    takeInput() {
        let option = this.state.handleSelect();
        if (option === 'A') {
            this.requestA();
        }
        else if (option === 'B') {
            this.requestB();
        }
    }
}
exports.VMContext = VMContext;

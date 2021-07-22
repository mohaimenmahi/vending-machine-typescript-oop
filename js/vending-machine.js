"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const start_1 = require("./start");
class VMContext {
    constructor(state) {
        this.transitionTo(state);
    }
    transitionTo(state) {
        this.state = state;
        this.state.setContext(this);
        this.takeInput();
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
        else {
            this.transitionTo(new start_1.Start());
        }
    }
}
exports.VMContext = VMContext;

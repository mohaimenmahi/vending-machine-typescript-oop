import { VMContext } from './vending-machine';
import { Start } from './start';
import { init } from './money';
import { productInit } from './products';

function main() {
  init();
  productInit();
  let context = new VMContext(new Start());
  context.takeInput()
}

main();
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "regenerator-runtime/runtime";

configure({ adapter: new Adapter() });

const error = console.error;

console.error = (message, ...args) => {
  if (/(Invalid prop|Failed prop type)/gi.test(message)) {
    throw new TypeError(message);
  }

  error.apply(console, [message, ...args]);
};

import { strictEqual } from "assert";


export class TreeError extends Error {
  constructor(message) {
    super(message);
  }
}

export class Node {
  ops = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    'x': (a, b) => a * b,
    '÷': (a, b) => a / b,
  }

  constructor(operator, value, left, right) {
    this.operator = operator;
    this.opMethod = this.ops[operator];
    this.value = value;
    this.left = left;
    this.right = right;
    this.validate();
  }

  validate() {
    if (this.opMethod) {
      if (this.value !== null) {
        throw new TreeError('A node can have either a value or an operation defined');
      }
      if (!this.left || !this.right || !this.left.result || !this.right.result) {
        throw new TreeError('A node with operation must have both children as valid nodes');
      }
    }
    else {
      if (!Number.isFinite(this.value)) {
        throw new TreeError('Value node has no valid value assigned');
      }
      if (this.left || this.right) {
        throw new TreeError('Value node cannot have children');
      }
    }
  }

  result() {
    return this.opMethod
      ? this.opMethod(this.left.result(), this.right.result())
      : this.value;
  }

  toString() {
    return this.opMethod
      ? `(${this.left.toString()} ${this.operator} ${this.right.toString()})`
      : this.value.toString();
  }
}

const tree = new Node(
  "÷",
  null,
  new Node(
    "+",
    null,
    new Node("", 7, null, null),
    new Node(
      "x",
      null,
      new Node("-", null, new Node("", 3, null, null), new Node("", 2, null, null)),
      new Node("", 5, null, null)
    )
  ),
  new Node("", 6, null, null)
);
strictEqual("((7 + ((3 - 2) x 5)) ÷ 6)", tree.toString());
strictEqual(2, tree.result());
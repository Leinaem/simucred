export {};
const sum = require("./sum");

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("adds 2 + 3 to equal 5", () => {
  expect(sum(2, 3)).toBe(5);
});

test("l'addition de nombres positifs n'est pas égale à zéro", () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});

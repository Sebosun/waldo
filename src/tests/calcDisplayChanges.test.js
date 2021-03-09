import calcDisplayChanges from "../functions/calcDisplayChanges";

test("works with default values", () => {
  expect(calcDisplayChanges([400, 200], [200, 100], [100, 50])).toStrictEqual([
    50,
    25,
  ]);
});

test("works with default values", () => {
  expect(calcDisplayChanges([400, 200], [400, 200], [100, 50])).toStrictEqual([
    100,
    50,
  ]);
});

test("works with default values", () => {
  expect(
    calcDisplayChanges([1600, 1000], [400, 200], [100, 50])
  ).toStrictEqual([25, 10]);
});

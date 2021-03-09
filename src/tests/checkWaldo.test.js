import checkWaldo from "../functions/checkWaldo.js";

// clickPos, charPos, aimbot

test("initial test", () => {
  expect(true).toBeTruthy();
});

test("returns true with simple input", () => {
  expect(checkWaldo([330, 95], [320, 80], 20)).toBe(true);
});

test("checks exact values", () => {
  expect(checkWaldo([320, 80], [320, 80], 20)).toBe(true);
});

test("doesnt just return true", () => {
  expect(checkWaldo([500, 80], [320, 80], 20)).toBe(false);
});

test("also chceks the X position", () => {
  expect(checkWaldo([320, 200], [320, 80], 20)).toBe(false);
});

test("works with floats", () => {
  expect(checkWaldo([320, 200], [320, 54.14], 20)).toBe(false);
});

test("works with floats", () => {
  expect(checkWaldo([320, 200], [320, 54.14], 20)).toBe(false);
});

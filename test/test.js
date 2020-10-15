const sortutil = require("../index");

it("should throw an error if first argument is not an array", () => {
  expect(() => sortutil(1)).toThrowError("Expected an array");
});

it("should throw an error if second argument is not an array", () => {
  expect(() => sortutil([], 3)).toThrowError("Expected an array");
});

it("should copy the initial array", () => {
  const arrayToSorted = [1, 8, 5, 3, 9];
  console.log(sortutil(arrayToSorted));
});

it("should return a sorted array", () => {
  const arrayToSorted = [
    { a: "a", b: 1, c: { d: { e: new Date(2020, 10, 8, 22) } } },
    { a: "a", b: 4, c: { d: { e: new Date(2020, 10, 7, 22) } } },
    { a: "w", b: 100, c: { d: { e: new Date(2020, 9, 8, 22) } } },
    { a: "z", b: 1, c: { d: { e: new Date(2020, 9, 8, 22) } } },
    { a: "j", b: 5, c: { d: { e: new Date(2020, 9, 8, 22) } } },
    { a: "j", b: 8 },
    { a: "a", b: 4, c: { d: { e: new Date(2020, 8, 8, 22) } } },
    { a: "a", b: 2, c: { d: { e: new Date(2020, 8, 8, 22) } } },
    { a: "a", b: 1, c: { d: { e: new Date(2020, 9, 8, 22) } } },
    { a: "z", c: { d: { e: new Date(2020, 10, 8, 22) } } },
    { a: "w", b: 40, c: { d: { e: new Date(2020, 10, 8, 22) } } },
    { a: "w", b: 41, c: { d: { e: new Date(2020, 10, 8, 22) } } },
    { b: 1, c: { d: { e: new Date(2020, 7, 8, 22) } } },
    { a: "w", b: 41, c: { d: { e: new Date(2020, 7, 8, 22) } } },
  ];

  const arraySorted = sortutil(arrayToSorted, [
    { orderBy: "asc", sortBy: "a" },
    { orderBy: "asc", sortBy: "c.d.e" },
    { orderBy: "asc", sortBy: "b" },
  ]);

  expect(Array.isArray(sortutil([{}]))).toBeTruthy();
});

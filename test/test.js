const sortutil = require("../index");

it("should throw an error if first argument is not an array", () => {
  expect(() => sortutil(1)).toThrowError("Expected an array");
});

it("should throw an error if second argument is not an array", () => {
  expect(() => sortutil([], 1)).toThrowError("Expected an array");
});

it("should throw an error if there is not at least one sortBy key", () => {
  expect(() => sortutil([], [{}])).toThrowError("sortBy key is required");
});

it("should order by 'asc' by default", () => {
  expect(sortutil([{ a: 5 }, { a: 2 }], [{ sortBy: "a" }])).toEqual([{ a: 2 }, { a: 5 }]);
});

it("should copy the initial array", () => {
  const arrayToSorted = [{ a: 5 }, { a: 2 }];

  expect(sortutil(arrayToSorted, [{ orderBy: "asc", sortBy: "a" }])).toEqual([{ a: 2 }, { a: 5 }]);
  expect(arrayToSorted).toEqual([{ a: 5 }, { a: 2 }]);
});

it("should return a sorted array", () => {
  const arrayToSorted = [
    { a: "a", b: 1, c: { d: { e: new Date(2020, 10, 8, 22) } } },
    { a: "w", b: 40, c: { d: null } },
    { a: "a", b: 4, c: { d: { e: new Date(2020, 10, 7, 22) } } },
    { a: "w", b: 100, c: { d: { e: new Date(2020, 9, 8, 22) } } },
    { a: "z", b: 1, c: { d: { e: new Date(2020, 9, 8, 22) } } },
    { a: "j", b: 5, c: { d: { e: new Date(2020, 9, 8, 22) } } },
    { a: "a", b: 4, c: { d: { e: new Date(2020, 8, 8, 22) } } },
    { a: "a", b: 2, c: { d: { e: new Date(2020, 8, 8, 22) } } },
    { a: "a", b: 1, c: { d: { e: new Date(2020, 9, 8, 22) } } },
    { a: "w", b: 40, c: { d: { e: new Date(2020, 10, 8, 22) } } },
    { a: "w", b: 41, c: { d: { e: new Date(2020, 10, 8, 22) } } },
    { a: "w", b: 41, c: { d: undefined } },
  ];

  const arraySorted = sortutil(arrayToSorted, [
    { orderBy: "asc", sortBy: "a" },
    { orderBy: "desc", sortBy: "c.d.e" },
    { orderBy: "asc", sortBy: "b" },
  ]);

  expect(arraySorted).toEqual([
    { a: "a", b: 1, c: { d: { e: new Date(2020, 10, 8, 22) } } },
    { a: "a", b: 4, c: { d: { e: new Date(2020, 10, 7, 22) } } },
    { a: "a", b: 1, c: { d: { e: new Date(2020, 9, 8, 22) } } },
    { a: "a", b: 2, c: { d: { e: new Date(2020, 8, 8, 22) } } },
    { a: "a", b: 4, c: { d: { e: new Date(2020, 8, 8, 22) } } },
    { a: "j", b: 5, c: { d: { e: new Date(2020, 9, 8, 22) } } },
    { a: "w", b: 40, c: { d: null } },
    { a: "w", b: 40, c: { d: { e: new Date(2020, 10, 8, 22) } } },
    { a: "w", b: 41, c: { d: { e: new Date(2020, 10, 8, 22) } } },
    { a: "w", b: 41, c: { d: undefined } },
    { a: "w", b: 100, c: { d: { e: new Date(2020, 9, 8, 22) } } },
    { a: "z", b: 1, c: { d: { e: new Date(2020, 9, 8, 22) } } },
  ]);
});

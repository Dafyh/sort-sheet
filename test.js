const sortSheet = require("./index");

it("should throw an error if first argument is not an array", () => {
  expect(() => sortSheet(1)).toThrowError("Expected an array");
});

it("should throw an error if second argument is not an array", () => {
  expect(() => sortSheet([], 1)).toThrowError("Expected an array");
});

it("should throw an error if there is not at least one sortBy key", () => {
  expect(() => sortSheet([], [{}])).toThrowError("sortBy key is required");
});

it("should order by 'asc' by default", () => {
  expect(sortSheet([{ k1: 5 }, { k1: 2 }], [{ sortBy: "k1" }])).toEqual([{ k1: 2 }, { k1: 5 }]);
});

it("should copy the initial array", () => {
  const arrayToSorted = [{ k1: 5 }, { k1: 2 }];

  expect(sortSheet(arrayToSorted, [{ orderBy: "asc", sortBy: "k1" }])).toEqual([{ k1: 2 }, { k1: 5 }]);
  expect(arrayToSorted).toEqual([{ k1: 5 }, { k1: 2 }]);
});

it("should keep indice with following values: undefined, null, empty string", () => {
  const arrayToSorted = [{ k1: undefined }, { k1: null }, { k1: undefined }, { k1: "" }, { k1: null }];

  expect(sortSheet(arrayToSorted, [{ orderBy: "asc", sortBy: "k1" }])).toEqual(arrayToSorted);
});

it("should sort boolean", () => {
  const arrayToSorted = [{ k1: false }, { k1: true }, { k1: false }];

  expect(sortSheet(arrayToSorted, [{ orderBy: "asc", sortBy: "k1" }])).toEqual([
    { k1: false },
    { k1: false },
    { k1: true },
  ]);
  expect(sortSheet(arrayToSorted, [{ orderBy: "desc", sortBy: "k1" }])).toEqual([
    { k1: true },
    { k1: false },
    { k1: false },
  ]);
});

it("should sort number", () => {
  const arrayToSorted = [{ k1: 1 }, { k1: 3 }, { k1: 2 }];

  expect(sortSheet(arrayToSorted, [{ orderBy: "asc", sortBy: "k1" }])).toEqual([
    { k1: 1 },
    { k1: 2 },
    { k1: 3 },
  ]);
  expect(sortSheet(arrayToSorted, [{ orderBy: "desc", sortBy: "k1" }])).toEqual([
    { k1: 3 },
    { k1: 2 },
    { k1: 1 },
  ]);
});

it("should sort string", () => {
  const arrayToSorted = [{ k1: "foo" }, { k1: "bar" }, { k1: "baz" }];

  expect(sortSheet(arrayToSorted, [{ orderBy: "asc", sortBy: "k1" }])).toEqual([
    { k1: "bar" },
    { k1: "baz" },
    { k1: "foo" },
  ]);
  expect(sortSheet(arrayToSorted, [{ orderBy: "desc", sortBy: "k1" }])).toEqual([
    { k1: "foo" },
    { k1: "baz" },
    { k1: "bar" },
  ]);
});

it("should sort date", () => {
  const arrayToSorted = [
    { k1: new Date(2020, 10, 8) },
    { k1: new Date(2020, 10, 6) },
    { k1: new Date(2020, 10, 9) },
  ];

  expect(sortSheet(arrayToSorted, [{ orderBy: "asc", sortBy: "k1" }])).toEqual([
    { k1: new Date(2020, 10, 6) },
    { k1: new Date(2020, 10, 8) },
    { k1: new Date(2020, 10, 9) },
  ]);
  expect(sortSheet(arrayToSorted, [{ orderBy: "desc", sortBy: "k1" }])).toEqual([
    { k1: new Date(2020, 10, 9) },
    { k1: new Date(2020, 10, 8) },
    { k1: new Date(2020, 10, 6) },
  ]);
});

it("should sort with compare function", () => {
  const arrayToSorted = [{ k1: [0] }, { k1: [0, 0, 0, 0] }, { k1: [0, 0] }, { k1: [0, 0, 0, 0, 0] }];
  const arrayToSorted2 = [{ k1: "c" }, { k1: "d" }, { k1: "b" }];

  expect(sortSheet(arrayToSorted, [{ orderBy: (a, b) => a.length - b.length, sortBy: "k1" }])).toEqual([
    { k1: [0] },
    { k1: [0, 0] },
    { k1: [0, 0, 0, 0] },
    { k1: [0, 0, 0, 0, 0] },
  ]);
  expect(sortSheet(arrayToSorted2, [{ orderBy: (a, b) => -a.localeCompare(b), sortBy: "k1" }])).toEqual([
    { k1: "d" },
    { k1: "c" },
    { k1: "b" },
  ]);
});

it("should sort multiple columns", () => {
  const arrayToSorted = [
    { k1: "a", k2: 1, k3: { k4: { k5: new Date(2020, 10, 8, 22) } } },
    { k1: "w", k2: 40, k3: { k4: null } },
    { k1: "a", k2: 4, k3: { k4: { k5: new Date(2020, 10, 7, 22) } } },
    { k1: "w", k2: 100, k3: { k4: { k5: new Date(2020, 9, 8, 22) } } },
    { k1: "z", k2: 1, k3: { k4: { k5: new Date(2020, 9, 8, 22) } } },
    { k1: "j", k2: 5, k3: { k4: { k5: new Date(2020, 9, 8, 22) } } },
    { k1: "a", k2: 4, k3: { k4: { k5: new Date(2020, 8, 8, 22) } } },
    { k1: "a", k2: 2, k3: { k4: { k5: new Date(2020, 8, 8, 22) } } },
    { k1: "a", k2: 1, k3: { k4: { k5: new Date(2020, 9, 8, 22) } } },
    { k1: "w", k2: 40, k3: { k4: { k5: new Date(2020, 10, 8, 22) } } },
    { k1: "w", k2: 41, k3: { k4: { k5: new Date(2020, 10, 8, 22) } } },
    { k1: "w", k2: 41, k3: { k4: undefined } },
  ];

  const arraySorted = sortSheet(arrayToSorted, [
    { orderBy: "asc", sortBy: "k1" },
    { orderBy: "desc", sortBy: "k3.k4.k5" },
    { orderBy: (a, b) => a - b, sortBy: "k2" },
  ]);

  const fooBar = [
    { k1: "a", k2: 6, k3: "foo" },
    { k1: "b", k2: 7, k3: "bar" },
    { k1: "a", k2: 6, k3: "baz" },
    { k1: "a", k2: 9, k3: "rab" },
    { k1: "b", k2: 5, k3: "zab" },
    { k1: "a", k2: 6, k3: "foo" },
  ];
  console.log(
    sortSheet(fooBar, [
      { orderBy: "asc", sortBy: "k1" }, // Sort by
      { orderBy: "desc", sortBy: "k2" }, // Then by
      { orderBy: "asc", sortBy: "k3" }, // Then by
    ]),
  );

  expect(arraySorted).toEqual([
    { k1: "a", k2: 1, k3: { k4: { k5: new Date(2020, 10, 8, 22) } } },
    { k1: "a", k2: 4, k3: { k4: { k5: new Date(2020, 10, 7, 22) } } },
    { k1: "a", k2: 1, k3: { k4: { k5: new Date(2020, 9, 8, 22) } } },
    { k1: "a", k2: 2, k3: { k4: { k5: new Date(2020, 8, 8, 22) } } },
    { k1: "a", k2: 4, k3: { k4: { k5: new Date(2020, 8, 8, 22) } } },
    { k1: "j", k2: 5, k3: { k4: { k5: new Date(2020, 9, 8, 22) } } },
    { k1: "w", k2: 40, k3: { k4: null } },
    { k1: "w", k2: 40, k3: { k4: { k5: new Date(2020, 10, 8, 22) } } },
    { k1: "w", k2: 41, k3: { k4: { k5: new Date(2020, 10, 8, 22) } } },
    { k1: "w", k2: 41, k3: { k4: undefined } },
    { k1: "w", k2: 100, k3: { k4: { k5: new Date(2020, 9, 8, 22) } } },
    { k1: "z", k2: 1, k3: { k4: { k5: new Date(2020, 9, 8, 22) } } },
  ]);
});

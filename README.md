# sort-sheet
![Version](https://img.shields.io/github/package-json/v/dafyh/sort-sheet) ![size](https://img.shields.io/bundlephobia/min/sort-sheet) ![License](https://img.shields.io/github/license/dafyh/sort-sheet) ![dependencies](https://img.shields.io/david/dafyh/sort-sheet) ![Build Status](https://img.shields.io/travis/com/dafyh/sort-sheet) ![Coverage](https://img.shields.io/codecov/c/github/dafyh/sort-sheet)

Useful to sort an array like a spreadsheet.

## Install

```
$ npm install sort-sheet
```

## Usage

```js
const sortSheet = require("sort-sheet");

const fooBar = [
  { k1: "a", k2: 6, k3: "foo" },
  { k1: "b", k2: 7, k3: "bar" },
  { k1: "a", k2: 6, k3: "baz" },
  { k1: "a", k2: 9, k3: "rab" },
  { k1: "b", k2: 5, k3: "zab" },
  { k1: "a", k2: 6, k3: "foo" },
];
sortSheet(fooBar, [
 { orderBy: "asc", sortBy: "k1" }, // Sort by
 { orderBy: "desc", sortBy: "k2" }, // Then by
 { orderBy: "asc", sortBy: "k3" }, // Then by
]);

/*=>
[
 { k1: "a", k2: 9, k3: "rab" },
 { k1: "a", k2: 6, k3: "baz" },
 { k1: "a", k2: 6, k3: "foo" },
 { k1: "a", k2: 6, k3: "foo" },
 { k1: "b", k2: 7, k3: "bar" },
 { k1: "b", k2: 5, k3: "zab" },
]
*/

const bar = [{ k1: { k2: "t" } }, { k1: { k2: "r" } }, { k1: { k2: "s" } }]
sortSheet(bar,[
 { orderBy: "asc", sortBy: "k1.k2" }
]);

//=> [{ k1: { k2: "r" } }, { k1: { k2: "s" }, { k1: { k2: "t" } } }]

const baz = [{ k1: "w" }, { k1: "e" }, { k1: "v" }]
sortSheet(baz, [
 { orderBy: (a, b) => a.localeCompare(b), sortBy: "k1" }, // Sort by
]);

//=> [{ k1: "e" }, { k1: "v" }, { k1: "w" }]

const foo = [{ k1: Array(3).fill("bar") }, { k1: Array(2).fill("baz") }]
sortSheet(fooBaz, [
 { orderBy: (a, b) => a.length - b.length, sortBy: "k1" }, // Sort by
]);

//=> [{ k1: [ "baz", "baz" ] }, { k1: [ "bar", "bar", "bar" ] }]
```

## API

### sortSheet(array, options?)

Returns a new sorted array.

#### array

Type: `Array`

#### options

Type: `Option[]`

```ts
interface Option {
 orderBy?: "asc" | "desc" | ((a: any, b: any) => number);
 sortBy: string;
}
```

[orderBy function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
# sort-sheet ![Version](https://img.shields.io/github/package-json/v/dafyh/sort-sheet) ![size](https://img.shields.io/bundlephobia/min/sort-sheet) ![License](https://img.shields.io/github/license/dafyh/sort-sheet) ![dependencies](https://img.shields.io/david/dafyh/sort-sheet) ![Build Status](https://img.shields.io/travis/com/dafyh/sort-sheet) ![Coverage](https://img.shields.io/codecov/c/github/dafyh/sort-sheet)

Useful to sort an array like a spreadsheet.

## Install

```
$ npm install sort-sheet
```

## Usage

```js
const sortSheet = require('sort-sheet');

sortSheet([{ k1: "a", k2: 1 }, { k1: "b", k2: 20 }, { k1: "a", k2: 6 }], [
 { orderBy: "asc", sortBy: "k1" }, // Sort by
 { orderBy: "desc", sortBy: "k2" }, // Then by
]);

//=> [{ k1: "a", k2: 6 }, { k1: "a", k2: 1 }, { k1: "b", k2: 20 }]

sortSheet(
 [
  { k1: "a", k2: { k3: "t" } },
  { k1: "b", k2: { k3: "r" } },
  { k1: "a", k2: { k3: "s" } },
  { k1: "u", k2: { k3: "s" } },
 ],
 [
  { orderBy: "asc", sortBy: "k2.k3" }, // Sort by
  { orderBy: "desc", sortBy: "k1" }, // Then by
 ],
);

/*
[
 { k1: "b", k2: { k3: "r" } },
 { k1: "u", k2: { k3: "s" } },
 { k1: "a", k2: { k3: "s" } },
 { k1: "a", k2: { k3: "t" } },
]
*/
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
 /**
  * @default []
  */
 orderBy?: "asc" | "desc";
 sortBy: string;
}
```
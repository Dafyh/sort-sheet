"use strict";

// Require Internals Dependencies
const { getFldVal } = require("./src/utils");

module.exports = (arr, opts = []) => {
  if (!Array.isArray(arr) || !Array.isArray(opts)) {
    throw new TypeError("Expected an array");
  }

  if (opts.find((opt) => !opt.sortBy)) {
    throw new Error("sortBy key is required");
  }

  return Array.from(arr).sort((a, b) =>
    opts
      .map(({ orderBy, sortBy }) => {
        const [prev, next] = [getFldVal(a, sortBy), getFldVal(b, sortBy)];
        const val = !Number.isNaN(Number(prev)) ? prev - next : String(prev).localeCompare(String(next));

        return typeof prev !== "boolean" && (!prev || !next) ? 0 : orderBy === "desc" ? -val : val;
      })
      .find(Boolean),
  );
};

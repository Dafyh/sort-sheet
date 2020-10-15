"use strict";

function getFldVal(obj, path) {
  if (!obj) return obj;

  const [root, ...paths] = path.split(".");

  return paths.length === 0 ? obj[root] : getFldVal(obj[root], paths.join("."));
}

module.exports = {
  getFldVal,
};

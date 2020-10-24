declare namespace sortSheet {
  interface Option {
    orderBy?: "asc" | "desc" | ((a: any, b: any) => number);
    sortBy: string;
  }
}

/**
 * @returns An array sorted
 */
declare function sortSheet<T>(
  arr: T,
  opts:  Array<sortSheet.Option>
): T;

export = sortSheet;
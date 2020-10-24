declare namespace sortSheet {
  interface Option {
    /**
     * @default []
     */
    orderBy?: "asc" | "desc";
    sortBy: string;
  }
}

/**
 * 
 * @returns An array sorted
 */
declare function sortSheet<T>(
  arr: T,
  opts?:  Array<sortSheet.Option>
): T;

export = sortSheet;
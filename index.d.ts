declare namespace sortSheet {
  interface Opts {
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
  opts?:  Array<sortSheet.Opts>
): T;

export = sortSheet;
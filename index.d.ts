declare namespace sortutil {
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
declare function sortutil<T>(
  arr: T,
  opts?:  Array<sortutil.Opts>
): T;

export = sortutil;
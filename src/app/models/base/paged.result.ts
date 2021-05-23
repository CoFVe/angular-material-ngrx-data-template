export type PagedResult<TData> = {
  results: TData;
  continuationToken?: string;
  skipToken?: string;
};

export type CollectionResult<TResults> = {
  results: TResults;
  continuationToken: string;
  skipToken: boolean;
};

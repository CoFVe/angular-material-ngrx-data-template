export type Error<TError> = {
  message: string;
  code: number;
  data: TError;
};

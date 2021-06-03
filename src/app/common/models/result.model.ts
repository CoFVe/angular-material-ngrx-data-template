import { Error } from "./error.model";

export type Result<TData,TError> = {
  data: TData;
  error: Error<TError>;
};

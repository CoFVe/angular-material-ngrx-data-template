import { BaseModel } from "./base/base.model";

export interface PaginationModel extends BaseModel<string> {
  page: number;
  size: number;
  length: number;
}

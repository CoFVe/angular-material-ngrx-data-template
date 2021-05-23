import { BaseModel } from "./base/base.model";

export interface DepartmentModel extends BaseModel<string> {
  name: string;
}

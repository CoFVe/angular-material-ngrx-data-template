import { BaseModel } from "../../common/models/base/base.model";

export interface DepartmentModel extends BaseModel<string> {
  name: string;
}

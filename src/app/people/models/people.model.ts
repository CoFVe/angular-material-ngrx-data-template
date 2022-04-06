import { BaseModel } from "../../common/models/base/base.model";

export interface PeopleModel extends BaseModel<string> {
  name: string;
  avatar?: string;
  email: string;
  phone?: string;
  departmentId: string;
}

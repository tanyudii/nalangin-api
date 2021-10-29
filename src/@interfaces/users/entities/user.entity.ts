import { IModelTimestamps } from '../../../@common/interfaces/model-timestamps.interface';

export interface IUser extends IModelTimestamps {
  id?: string;
  name: string;
  phoneNumber: string;
  email?: string;
  password?: string;
  avatar?: string;
}

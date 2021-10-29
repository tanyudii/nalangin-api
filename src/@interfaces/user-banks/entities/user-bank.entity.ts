import { IModelTimestamps } from '../../../@common/interfaces/model-timestamps.interface';

export interface IUserBank extends IModelTimestamps {
  id?: string;
  bankName: string;
  bankNumber: string;
}

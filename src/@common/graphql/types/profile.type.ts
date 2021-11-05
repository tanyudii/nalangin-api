import { Field, ObjectType } from '@nestjs/graphql';

import { IUser } from '../../interfaces/user.interface';

@ObjectType()
export class Profile implements IUser {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  phoneNumber: string;
}

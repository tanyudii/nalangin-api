import { Resource } from '../../@common/graphql/types/resource.type';
import { UserBank } from '../entities/user-bank.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserBankResource extends Resource<UserBankResource> {
  @Field(() => UserBank)
  data: UserBank;
}

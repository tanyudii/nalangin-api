import { Resource } from '../../@common/graphql/types/resource.type';
import { UserBank } from '../entities/user-bank.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from '../../@common/graphql/types/pagination-meta.type';

@ObjectType()
export class UserBankCollection extends Resource<UserBankCollection> {
  @Field(() => [UserBank])
  data: UserBank[];

  @Field(() => PaginationMeta)
  meta: PaginationMeta;
}

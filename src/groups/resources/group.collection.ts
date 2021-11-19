import { Field, ObjectType } from '@nestjs/graphql';
import { Resource } from '../../@common/graphql/types/resource.type';
import { Group } from '../entities/group.entity';
import { PaginationMeta } from '../../@common/graphql/types/pagination-meta.type';

@ObjectType()
export class GroupCollection extends Resource<GroupCollection> {
  @Field(() => [Group])
  data: Group[];

  @Field(() => PaginationMeta)
  meta: PaginationMeta;
}

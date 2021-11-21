import { Resource } from '../../@common/graphql/types/resource.type';
import { Field, ObjectType } from '@nestjs/graphql';
import { Shopping } from '../entities/shopping.entity';
import { PaginationMeta } from '../../@common/graphql/types/pagination-meta.type';

@ObjectType()
export class ShoppingCollection extends Resource<ShoppingCollection> {
  @Field(() => [Shopping])
  data: Shopping[];

  @Field(() => PaginationMeta)
  meta: PaginationMeta;
}

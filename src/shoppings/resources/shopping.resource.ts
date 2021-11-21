import { Resource } from '../../@common/graphql/types/resource.type';
import { Field, ObjectType } from '@nestjs/graphql';
import { Shopping } from '../entities/shopping.entity';

@ObjectType()
export class ShoppingResource extends Resource<ShoppingResource> {
  @Field(() => Shopping)
  data: Shopping;
}

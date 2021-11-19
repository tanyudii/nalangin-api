import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IPaginationMeta } from 'nestjs-typeorm-paginate';

@ObjectType()
export class PaginationMeta implements IPaginationMeta {
  @Field(() => Int)
  itemCount: number;

  @Field(() => Int, { nullable: true })
  totalItems?: number;

  @Field(() => Int)
  itemsPerPage: number;

  @Field(() => Int, { nullable: true })
  totalPages?: number;
  @Field(() => Int)
  currentPage: number;
}

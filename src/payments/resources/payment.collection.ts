import { Resource } from '../../@common/graphql/types/resource.type';
import { Field, ObjectType } from '@nestjs/graphql';
import { Payment } from '../entities/payment.entity';
import { PaginationMeta } from '../../@common/graphql/types/pagination-meta.type';

@ObjectType()
export class PaymentCollection extends Resource<PaymentCollection> {
  @Field(() => [Payment])
  data: Payment[];

  @Field(() => PaginationMeta)
  meta: PaginationMeta;
}

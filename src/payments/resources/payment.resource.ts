import { Resource } from '../../@common/graphql/types/resource.type';
import { Field, ObjectType } from '@nestjs/graphql';
import { Payment } from '../entities/payment.entity';

@ObjectType()
export class PaymentResource extends Resource<PaymentResource> {
  @Field(() => Payment)
  data: Payment;
}

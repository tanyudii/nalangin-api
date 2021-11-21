import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { GqlCurrentUser } from '../../@common/decorators/current-user.decorator';
import { JwtGqlGuard } from '../../@common/guards/jwt-gql.guard';
import { IUser } from '../../@common/interfaces/user.interface';
import { User } from '../../users/entities/user.entity';
import { CreatePaymentInput } from '../dto/create-payment.input';
import { UpdatePaymentInput } from '../dto/update-payment.input';
import { PaymentItem } from '../entities/payment-item.entity';
import { Payment } from '../entities/payment.entity';
import { PaymentsLoader } from '../loaders/payments.loader';
import { PaymentsService } from '../services/payments.service';
import { PaymentCollection } from '../resources/payment.collection';
import { PaymentResource } from '../resources/payment.resource';
import { PaginationArg } from '../../@common/graphql/args/pagination.arg';

@Resolver(() => Payment)
export class PaymentsResolver {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly paymentsLoader: PaymentsLoader,
  ) {}

  @UseGuards(JwtGqlGuard)
  @Mutation(() => PaymentResource)
  async createPayment(
    @GqlCurrentUser() user: IUser,
    @Args('createPaymentInput') createPaymentInput: CreatePaymentInput,
  ): Promise<PaymentResource> {
    const data = await this.paymentsService.create(user.id, createPaymentInput);
    return new PaymentResource({ data });
  }

  @UseGuards(JwtGqlGuard)
  @Query(() => PaymentCollection, { name: 'payments' })
  async findAll(
    @GqlCurrentUser() user: IUser,
    @Args() paginationArg: PaginationArg,
  ): Promise<PaymentCollection> {
    const { items: data, meta } = await this.paymentsService.findAllPagination(
      user.id,
      paginationArg,
    );
    return new PaymentCollection({ data, meta });
  }

  @UseGuards(JwtGqlGuard)
  @Query(() => PaymentResource, { name: 'payment' })
  async findOne(
    @GqlCurrentUser() user: IUser,
    @Args('id') id: string,
  ): Promise<PaymentResource> {
    const data = await this.paymentsService.findOne(user.id, id);
    return new PaymentResource({ data });
  }

  @UseGuards(JwtGqlGuard)
  @Mutation(() => PaymentResource)
  async updatePayment(
    @GqlCurrentUser() user: IUser,
    @Args('updatePaymentInput') updatePaymentInput: UpdatePaymentInput,
  ): Promise<PaymentResource> {
    const data = await this.paymentsService.update(
      user.id,
      updatePaymentInput.id,
      updatePaymentInput,
    );
    return new PaymentResource({ data });
  }

  @UseGuards(JwtGqlGuard)
  @Mutation(() => PaymentResource)
  async removePayment(
    @GqlCurrentUser() user: IUser,
    @Args('id') id: string,
  ): Promise<PaymentResource> {
    const data = await this.paymentsService.remove(user.id, id);
    return new PaymentResource({ data });
  }

  @ResolveField('user', () => User)
  async getUser(@Parent() payment: Payment): Promise<User> {
    const { userId } = payment;
    return this.paymentsLoader.batchUsers.load(userId);
  }

  @ResolveField('paymentItems', () => [PaymentItem])
  async getPaymentItems(@Parent() payment: Payment): Promise<PaymentItem[]> {
    const { id } = payment;
    return this.paymentsLoader.batchPaymentItems.load(id);
  }
}

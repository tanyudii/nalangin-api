import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';

import { UsersService } from '../../users/services/users.service';
import { PaymentItemsService } from '../services/payment-items.service';
import { PaymentsService } from '../services/payments.service';

@Injectable({ scope: Scope.REQUEST })
export class PaymentsLoader {
  constructor(
    private readonly usersService: UsersService,
    private readonly paymentsService: PaymentsService,
    private readonly paymentItemsService: PaymentItemsService,
  ) {}

  public readonly batchUsers = new DataLoader(async (userIds: string[]) => {
    const users = await this.usersService.findAllByIds(userIds);
    const usersMap = new Map(users.map((user) => [user.id, user]));
    return userIds.map((userId) => usersMap.get(userId));
  });

  public readonly batchPaymentItems = new DataLoader(
    async (paymentIds: string[]) => {
      const paymentItems = await this.paymentItemsService.findAllByPaymentIds(
        paymentIds,
      );

      return paymentIds.map((paymentId) =>
        paymentItems.filter(
          (paymentItem) => paymentItem.paymentId === paymentId,
        ),
      );
    },
  );
}

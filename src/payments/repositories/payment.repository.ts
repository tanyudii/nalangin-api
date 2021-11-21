import { EntityRepository, Repository } from 'typeorm';

import { Payment } from '../entities/payment.entity';
import { QueryRunner } from 'typeorm/query-runner/QueryRunner';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';

@EntityRepository(Payment)
export class PaymentRepository extends Repository<Payment> {
  my(
    userId: string,
    alias: string,
    queryRunner?: QueryRunner,
  ): SelectQueryBuilder<Payment> {
    return this.createQueryBuilder(alias, queryRunner).andWhere((qb) => {
      qb.where(`${alias}.userId = :userId`, { userId });
    });
  }
}

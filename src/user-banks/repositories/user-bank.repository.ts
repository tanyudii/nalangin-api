import { EntityRepository, Repository } from 'typeorm';

import { UserBank } from '../entities/user-bank.entity';
import { QueryRunner } from 'typeorm/query-runner/QueryRunner';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';

@EntityRepository(UserBank)
export class UserBankRepository extends Repository<UserBank> {
  my(
    userId: string,
    alias: string,
    queryRunner?: QueryRunner,
  ): SelectQueryBuilder<UserBank> {
    return this.createQueryBuilder(alias, queryRunner).andWhere((qb) => {
      qb.where(`${alias}.userId = :userId`, { userId });
    });
  }
}

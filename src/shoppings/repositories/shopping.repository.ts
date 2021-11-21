import { EntityRepository, Repository } from 'typeorm';

import { Shopping } from '../entities/shopping.entity';
import { QueryRunner } from 'typeorm/query-runner/QueryRunner';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';

@EntityRepository(Shopping)
export class ShoppingRepository extends Repository<Shopping> {
  my(
    userId: string,
    alias: string,
    queryRunner?: QueryRunner,
  ): SelectQueryBuilder<Shopping> {
    return this.createQueryBuilder(alias, queryRunner).andWhere((qb) => {
      qb.where(`${alias}.userId = :userId`, { userId });
    });
  }
}

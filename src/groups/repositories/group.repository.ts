import { EntityRepository, Repository } from 'typeorm';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import { QueryRunner } from 'typeorm/query-runner/QueryRunner';

import { Group } from '../entities/group.entity';

@EntityRepository(Group)
export class GroupRepository extends Repository<Group> {
  my(
    userId: string,
    alias?: string,
    queryRunner?: QueryRunner,
  ): SelectQueryBuilder<Group> {
    return this.createQueryBuilder(alias, queryRunner)
      .leftJoinAndSelect(`${alias}.groupUsers`, 'groupUsers')
      .andWhere((qb) => {
        qb.where('groupUsers.userId = :userId', { userId });
      });
  }
}

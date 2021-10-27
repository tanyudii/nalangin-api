import { EntityRepository, Repository } from 'typeorm';

import { GroupUser } from '../entities/group-user.entity';

@EntityRepository(GroupUser)
export class GroupUserRepository extends Repository<GroupUser> {}

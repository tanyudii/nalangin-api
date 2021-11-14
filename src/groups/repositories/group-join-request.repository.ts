import { EntityRepository, Repository } from 'typeorm';

import { GroupJoinRequest } from '../entities/group-join-request.entity';

@EntityRepository(GroupJoinRequest)
export class GroupJoinRequestRepository extends Repository<GroupJoinRequest> {}

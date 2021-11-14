import { EntityRepository, Repository } from 'typeorm';

import { GroupInvitation } from '../entities/group-invitation.entity';

@EntityRepository(GroupInvitation)
export class GroupInvitationRepository extends Repository<GroupInvitation> {}

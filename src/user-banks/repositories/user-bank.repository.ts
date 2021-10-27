import { EntityRepository, Repository } from 'typeorm';

import { UserBank } from '../entities/user-bank.entity';

@EntityRepository(UserBank)
export class UserBankRepository extends Repository<UserBank> {}

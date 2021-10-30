import { EntityRepository, Repository } from 'typeorm';

import { AccessToken } from '../entities/access-token.entity';

@EntityRepository(AccessToken)
export class AccessTokenRepository extends Repository<AccessToken> {}

import { EntityRepository, Repository } from 'typeorm';

import { Shopping } from '../entities/shopping.entity';

@EntityRepository(Shopping)
export class ShoppingRepository extends Repository<Shopping> {}

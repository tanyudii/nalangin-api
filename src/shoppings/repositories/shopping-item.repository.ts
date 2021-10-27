import { EntityRepository, Repository } from 'typeorm';

import { ShoppingItem } from '../entities/shopping-item.entity';

@EntityRepository(ShoppingItem)
export class ShoppingItemRepository extends Repository<ShoppingItem> {}

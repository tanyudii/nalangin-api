import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../users/users.module';
import { ShoppingsLoader } from './loaders/shoppings.loader';
import { ShoppingItemRepository } from './repositories/shopping-item.repository';
import { ShoppingRepository } from './repositories/shopping.repository';
import { ShoppingsResolver } from './resolvers/shoppings.resolver';
import { ShoppingItemsService } from './services/shopping-items.service';
import { ShoppingsService } from './services/shoppings.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShoppingRepository, ShoppingItemRepository]),
    UsersModule,
  ],
  providers: [
    ShoppingsLoader,
    ShoppingsResolver,
    ShoppingsService,
    ShoppingItemsService,
  ],
  exports: [ShoppingsService, ShoppingItemsService],
})
export class ShoppingsModule {}

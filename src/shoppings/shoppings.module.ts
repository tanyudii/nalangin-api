import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../users/users.module';
import { ShoppingItem } from './entities/shopping-items.entity';
import { Shopping } from './entities/shopping.entity';
import { ShoppingsLoader } from './loaders/shoppings.loader';
import { ShoppingsResolver } from './resolvers/shoppings.resolver';
import { ShoppingItemsService } from './services/shopping-items.service';
import { ShoppingsService } from './services/shoppings.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Shopping, ShoppingItem])],
  providers: [
    ShoppingsResolver,
    ShoppingsService,
    ShoppingItemsService,
    ShoppingsLoader,
  ],
  exports: [ShoppingItemsService],
})
export class ShoppingsModule {}

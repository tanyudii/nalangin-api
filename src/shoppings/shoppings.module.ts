import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingsService } from './services/shoppings.service';
import { ShoppingsLoader } from './loaders/shoppings.loader';
import { ShoppingsResolver } from './resolvers/shoppings.resolver';
import { UsersModule } from '../users/users.module';
import { Shopping } from './entities/shopping.entity';
import { ShoppingItem } from './entities/shopping-items.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Shopping, ShoppingItem])],
  providers: [ShoppingsResolver, ShoppingsService, ShoppingsLoader],
})
export class ShoppingsModule {}

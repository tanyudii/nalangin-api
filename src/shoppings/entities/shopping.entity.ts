import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { ShoppingItem } from './shopping-item.entity';

@ObjectType()
@Entity({ name: 'shoppings' })
export class Shopping {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Field()
  @Column('uuid')
  userId: string;

  @Field()
  @Column('date')
  date: string;

  @Field()
  @Column()
  store: string;

  @Field(() => Boolean)
  @Column('boolean', { default: '0' })
  isPpn: boolean;

  @Field(() => Number)
  @Column('double')
  delivery: number;

  @Field(() => Number)
  @Column('double')
  discount: number;

  @Field(() => Number)
  @Column('double')
  ppn: number;

  @Field(() => Number)
  @Column('double')
  subtotal: number;

  @Field(() => Number)
  @Column('double')
  grandTotal: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  @DeleteDateColumn()
  deletedAt?: Date;

  @Field(() => User)
  user: User;

  @Field(() => [ShoppingItem])
  @OneToMany(() => ShoppingItem, (shoppingItem) => shoppingItem.shopping)
  shoppingItems: ShoppingItem[];
}

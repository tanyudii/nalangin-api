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
import { ShoppingItem } from './shopping-items.entity';

@ObjectType()
@Entity({ name: 'shoppings' })
export class Shopping {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Field()
  @Column({ type: 'uuid' })
  userId: string;

  @Field(() => Date)
  @Column({ type: 'date' })
  date: Date;

  @Field()
  @Column()
  store: string;

  @Field(() => Boolean)
  @Column('tinyint', { default: '0' })
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
  grandTotal: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Field(() => User)
  user: User;

  @Field(() => [ShoppingItem])
  @OneToMany(() => ShoppingItem, (shoppingItem) => shoppingItem.shopping)
  shoppingItems: ShoppingItem[];
}

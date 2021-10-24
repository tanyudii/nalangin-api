import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Shopping } from './shopping.entity';

@ObjectType()
@Entity({ name: 'shopping_items' })
export class ShoppingItem {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Field()
  @Column('uuid')
  shoppingId: string;

  @Field()
  @Column('uuid')
  borrowerId: string;

  @Field()
  @Column()
  description: string;

  @Field(() => Number)
  @Column('double')
  price: number;

  @Field(() => Number)
  @Column('float')
  percentage: number;

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
  total: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  @DeleteDateColumn()
  deletedAt?: Date;

  @JoinColumn()
  @ManyToOne(() => Shopping, (shopping) => shopping.shoppingItems, {
    onUpdate: 'CASCADE',
  })
  shopping: Shopping;
}

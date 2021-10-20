import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Shopping } from './shopping.entity';

@ObjectType()
@Entity({ name: 'shopping_items' })
export class ShoppingItem {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Field()
  @Column({ type: 'uuid' })
  shoppingId: string;

  @Field()
  @Column({ type: 'uuid' })
  borrowerId: string;

  @Field(() => Number)
  @Column('double')
  price: number;

  @Field()
  @Column()
  description: string;

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
  grandTotal: number;

  @JoinColumn()
  @ManyToOne(() => Shopping, (shopping) => shopping.shoppingItems, {
    onUpdate: 'CASCADE',
  })
  shopping: Shopping;
}

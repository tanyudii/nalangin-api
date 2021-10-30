import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Payment } from './payment.entity';

@ObjectType()
@Entity('payment_items')
export class PaymentItem {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Field()
  @Column('uuid')
  paymentId: string;

  @Field()
  @Column('uuid')
  shoppingId: string;

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

  @JoinColumn()
  @ManyToOne(() => Payment, (payment) => payment.paymentItems, {
    onUpdate: 'CASCADE',
  })
  payment: Payment;
}

import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { PaymentItem } from './payment-item.entity';

@ObjectType()
@Entity({ name: 'payments' })
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Field()
  @Column('uuid')
  userId: string;

  @Field()
  @Column('date')
  date: string;

  @Field()
  @Column('uuid')
  lenderId: string;

  @Field()
  @Column('uuid')
  lenderBankId: string;

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

  @Field(() => [PaymentItem])
  @OneToMany(() => PaymentItem, (paymentItem) => paymentItem.payment)
  paymentItems: PaymentItem[];

  @Field(() => User)
  user: User;
}

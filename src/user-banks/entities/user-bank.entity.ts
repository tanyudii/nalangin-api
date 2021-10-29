import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IUserBank } from '../../@interfaces/user-banks/entities/user-bank.entity';

@ObjectType()
@Entity({ name: 'user_banks' })
export class UserBank implements IUserBank {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Field()
  @Column('uuid')
  userId: string;

  @Field()
  @Column()
  bankName: string;

  @Field()
  @Column()
  bankNumber: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  @DeleteDateColumn()
  deletedAt?: Date;
}

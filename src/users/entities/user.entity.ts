import { Field, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IUser } from '../../@interfaces/users/entities/user.entity';

@ObjectType()
@Entity({ name: 'users' })
export class User implements IUser {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique: true })
  phoneNumber: string;

  @Field()
  @Column({ unique: true, nullable: true })
  email?: string;

  @Exclude()
  @Column({ nullable: true })
  password?: string;

  @Field()
  @Column({ nullable: true })
  avatar?: string;

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

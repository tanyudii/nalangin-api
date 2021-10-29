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

import { User } from '../../users/entities/user.entity';
import { Group } from './group.entity';

export enum RoleType {
  CHIEFTAIN = 'Chieftain',
  VILLAGER = 'Villager',
}

@ObjectType()
@Entity({ name: 'group_users' })
export class GroupUser {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Field()
  @Column('uuid')
  groupId: string;

  @Field()
  @Column('uuid')
  userId: string;

  @Field()
  @Column('enum', { enum: RoleType })
  role: string;

  @Column()
  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  @DeleteDateColumn()
  deletedAt?: Date;

  @Field(() => Group)
  @JoinColumn()
  @ManyToOne(() => Group, (group) => group.groupUsers, {
    onUpdate: 'CASCADE',
  })
  group: Group;

  @Field(() => User)
  user: User;
}

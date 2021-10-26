import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Group } from './group.entity';

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

  @Field(() => Group)
  @JoinColumn()
  @ManyToOne(() => Group, (group) => group.groupUsers, {
    onUpdate: 'CASCADE',
  })
  group: Group;

  @Field(() => User)
  user: User;
}

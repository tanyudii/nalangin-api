import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('group_invitations')
export class GroupInvitation {
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
  @Column('uuid')
  createdBy: string;

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

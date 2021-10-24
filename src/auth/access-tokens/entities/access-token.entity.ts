import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'access_tokens' })
export class AccessToken {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('uuid')
  userId: string;

  @Column('boolean', { default: '0' })
  revoked: boolean;

  @Column('datetime')
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

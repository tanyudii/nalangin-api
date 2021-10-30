import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'refresh_tokens' })
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('uuid')
  userId: string;

  @Column('uuid')
  accessTokenId: string;

  @Column('boolean', { default: '0' })
  revoked: boolean;

  @Column('datetime')
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

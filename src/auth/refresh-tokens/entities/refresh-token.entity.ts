import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('refresh_tokens')
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('uuid')
  userId: string;

  @Column('uuid')
  accessTokenId: string;

  @Column('boolean', { default: '0' })
  revoked: boolean;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

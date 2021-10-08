import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RefreshToken } from '../../refresh-tokens/entities/refresh-token.entity';

@Entity({ name: 'access_tokens' })
export class AccessToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'tinyint', default: 0 })
  revoked: boolean;

  @Column({ type: 'timestamp' })
  expiresAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToOne(() => RefreshToken, (obj) => obj.accessToken, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  refreshToken: RefreshToken;
}

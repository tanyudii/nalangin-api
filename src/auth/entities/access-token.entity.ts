import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RefreshToken } from './refresh-token.entity';

@Entity({ name: 'access_tokens' })
export class AccessToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'tinyint', default: 0 })
  revoked: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => RefreshToken, (obj) => obj.accessToken, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  refreshToken: RefreshToken;
}

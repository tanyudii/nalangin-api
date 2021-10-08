import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccessToken } from './access-token.entity';

@Entity({ name: 'refresh_tokens' })
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  accessTokenId: string;

  @Column({ type: 'tinyint', default: 0 })
  revoked: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => AccessToken, (obj) => obj.refreshToken, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  accessToken: AccessToken;
}

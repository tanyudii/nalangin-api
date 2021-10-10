import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccessToken } from '../../access-tokens/entities/access-token.entity';

@Entity({ name: 'refresh_tokens' })
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  accessTokenId: string;

  @Column({ type: 'smallint', default: 0 })
  revoked: boolean;

  @Column({ type: 'datetime' })
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => AccessToken, (obj) => obj.refreshToken, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  accessToken: AccessToken;
}

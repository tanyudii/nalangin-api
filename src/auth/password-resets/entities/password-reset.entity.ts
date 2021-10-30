import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('password_resets')
export class PasswordReset {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('uuid')
  userId: string;

  @Column()
  email: string;

  @Column('datetime')
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}

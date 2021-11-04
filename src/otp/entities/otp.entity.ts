import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('otp')
export class Otp {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  subjectType: string;

  @Column()
  subjectId: string;

  @Column()
  phoneNumber: string;

  @Column()
  code: string;

  @Column('integer')
  increment: number;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  expiresAt: Date;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  availableNextAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}

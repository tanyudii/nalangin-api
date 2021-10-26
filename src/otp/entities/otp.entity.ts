import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'otp' })
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

  @Column('timestamp')
  expiresAt: Date;

  @Column('timestamp')
  availableNextAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}

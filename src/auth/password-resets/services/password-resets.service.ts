import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordReset } from '../entities/password-reset.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PasswordResetsService {
  constructor(
    @InjectRepository(PasswordReset)
    private readonly passwordResetRepository: Repository<PasswordReset>,
  ) {}

  async create(createPasswordResetDto): Promise<PasswordReset> {
    const { userId, email } = createPasswordResetDto;
    return this.passwordResetRepository.save({
      userId,
      email,
      expiresAt: this.generateExpiresAt(),
    });
  }

  generateExpiresAt() {
    const date = new Date();
    date.setMinutes(date.getMinutes() + 30);
    return date;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { MoreThan } from 'typeorm';

import { CreatePasswordResetDto } from '../dto/create-password-reset.dto';
import { PasswordReset } from '../entities/password-reset.entity';
import { PasswordResetRepository } from '../repositories/password-reset.repository';

@Injectable()
export class PasswordResetsService {
  constructor(
    private readonly passwordResetRepository: PasswordResetRepository,
  ) {}

  async create(
    createPasswordResetDto: CreatePasswordResetDto,
  ): Promise<PasswordReset> {
    const { userId, email } = createPasswordResetDto;

    const oldPasswordReset = await this.passwordResetRepository.findOne({
      userId,
      email,
    });

    if (oldPasswordReset) {
      return this.passwordResetRepository.save({
        ...oldPasswordReset,
        expiresAt: this.generateExpiresAt(),
      });
    }

    return this.passwordResetRepository.save({
      userId,
      email,
      expiresAt: this.generateExpiresAt(),
    });
  }

  async remove(id: string): Promise<PasswordReset> {
    const passwordReset = await this.passwordResetRepository.findOne({ id });

    if (!passwordReset) {
      throw new NotFoundException();
    }

    await this.passwordResetRepository.delete({ id });

    return passwordReset;
  }

  async isValidExpiry(
    passwordResetId: string,
    email: string,
  ): Promise<boolean> {
    return !!(await this.passwordResetRepository.findOne({
      where: {
        id: passwordResetId,
        email,
        expiresAt: MoreThan(new Date()),
      },
    }));
  }

  generateExpiresAt() {
    const date = new Date();
    date.setMinutes(date.getMinutes() + 30);
    return date;
  }
}

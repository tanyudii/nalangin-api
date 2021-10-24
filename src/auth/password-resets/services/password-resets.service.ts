import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';

import { CreatePasswordResetDto } from '../dtos/create-password-reset.dto';
import { PasswordReset } from '../entities/password-reset.entity';

@Injectable()
export class PasswordResetsService {
  constructor(
    @InjectRepository(PasswordReset)
    private readonly passwordResetRepository: Repository<PasswordReset>,
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

import { Injectable, NotFoundException } from '@nestjs/common';
import * as moment from 'moment';
import { LessThan, MoreThan } from 'typeorm';

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

    await this.passwordResetRepository.delete({
      expiresAt: LessThan(new Date()),
    });

    const oldPasswordReset = await this.passwordResetRepository.findOne({
      userId,
      email,
    });

    return this.passwordResetRepository.save({
      ...oldPasswordReset,
      userId,
      email,
      expiresAt: moment().add(30, 'minutes').toDate(),
    });
  }

  async remove(id: string): Promise<PasswordReset> {
    const passwordReset = await this.passwordResetRepository.findOne({ id });

    if (!passwordReset) {
      throw new NotFoundException();
    }

    return this.passwordResetRepository.remove(passwordReset);
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
}

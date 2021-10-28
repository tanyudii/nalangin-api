import { BadRequestException, Injectable } from '@nestjs/common';
import * as moment from 'moment';
import * as pluralize from 'pluralize';
import { DeleteResult, LessThan, MoreThan } from 'typeorm';

import { CreateOtpDto } from '../dtos/create-otp.dto';
import { Otp } from '../entities/otp.entity';
import { OtpRepository } from '../repositories/otp.repository';

@Injectable()
export class OtpService {
  constructor(private readonly otpRepository: OtpRepository) {}

  async create(createOtpDto: CreateOtpDto): Promise<Otp> {
    const {
      subjectType,
      subjectId,
      phoneNumber,
      expiresIn = 120,
    } = createOtpDto;

    const increment = 15;
    const expiresAt: Date = moment().add(expiresIn, 'seconds').toDate();

    await this.removeExpired();

    const currentOtp = await this.otpRepository.findOne({
      subjectId,
      subjectType,
      phoneNumber,
    });

    if (currentOtp) {
      if (currentOtp.availableNextAt.getTime() > new Date().getTime()) {
        const retryingInSeconds = Math.ceil(
          currentOtp.availableNextAt.getTime() / 1000 -
            new Date().getTime() / 1000,
        );

        const wordSeconds = pluralize('second', retryingInSeconds);

        throw new BadRequestException(
          `Please wait ${retryingInSeconds} ${wordSeconds} before retrying.`,
        );
      }

      const nextIncrement = currentOtp.increment + increment;

      return this.otpRepository.save({
        ...currentOtp,
        increment: nextIncrement,
        expiresAt,
        availableNextAt: moment().add(nextIncrement, 'seconds').toDate(),
      });
    }

    const code = await this.generateCodeNumber(
      subjectType,
      subjectId,
      phoneNumber,
    );

    return this.otpRepository.save({
      subjectId,
      subjectType,
      phoneNumber,
      code,
      increment,
      expiresAt,
      availableNextAt: moment().add(increment, 'seconds').toDate(),
    });
  }

  async revoke(
    subjectType: string,
    subjectId: string,
    phoneNumber: string,
    code: string,
  ): Promise<boolean> {
    return (
      (
        await this.otpRepository.delete({
          subjectType,
          subjectId,
          phoneNumber,
          code,
          expiresAt: MoreThan(new Date()),
        })
      ).affected > 0
    );
  }

  async isValidExpiry(
    subjectType: string,
    subjectId: string,
    phoneNumber: string,
    code: string,
  ): Promise<boolean> {
    return !!(await this.otpRepository.findOne({
      where: {
        subjectType,
        subjectId,
        phoneNumber,
        code,
        expiresAt: MoreThan(new Date()),
      },
    }));
  }

  protected async generateCodeNumber(
    subjectType: string,
    subjectId: string,
    phoneNumber: string,
  ): Promise<string> {
    const code = Math.floor(1000 + Math.random() * 9000).toString();

    const isExists =
      (await this.otpRepository.count({
        subjectType,
        subjectId,
        phoneNumber,
        code,
      })) > 0;

    return isExists
      ? this.generateCodeNumber(subjectType, subjectId, phoneNumber)
      : code;
  }

  protected async removeExpired(): Promise<DeleteResult> {
    return this.otpRepository.delete({ expiresAt: LessThan(new Date()) });
  }
}

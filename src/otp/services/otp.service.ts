import { BadRequestException, Injectable } from '@nestjs/common';
import * as moment from 'moment';
import * as pluralize from 'pluralize';
import { DeleteResult, LessThan, MoreThan } from 'typeorm';

import { CreateOtpInput } from '../dtos/create-otp.input';
import { Otp } from '../entities/otp.entity';
import { OtpRepository } from '../repositories/otp.repository';
import { OtpResponse } from '../types/otp-response.type';

@Injectable()
export class OtpService {
  constructor(private readonly otpRepository: OtpRepository) {}

  async create(createOtpDto: CreateOtpInput): Promise<OtpResponse> {
    const { subjectType, subjectId, phoneNumber } = createOtpDto;

    const expiresIn = 120;
    const increment = 15;
    const expiresAt: Date = moment().add(expiresIn, 'seconds').toDate();

    await this.removeExpired();

    let currentOtp = await this.otpRepository.findOne({
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

      currentOtp = await this.otpRepository.save({
        ...currentOtp,
        increment: nextIncrement,
        expiresAt,
        availableNextAt: moment().add(nextIncrement, 'seconds').toDate(),
      });

      return this.otpResponseFactory('We have sent otp!', currentOtp);
    }

    const code = await this.generateCodeNumber(
      subjectType,
      subjectId,
      phoneNumber,
    );

    const otp = await this.otpRepository.save({
      subjectId,
      subjectType,
      phoneNumber,
      code,
      increment,
      expiresAt,
      availableNextAt: moment().add(increment, 'seconds').toDate(),
    });

    return this.otpResponseFactory('We have sent otp!', otp);
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

  protected otpResponseFactory(message = 'Success', otp: Otp): OtpResponse {
    const otpResponse = new OtpResponse();
    otpResponse.message = message;
    otpResponse.increment = otp.increment;
    otpResponse.availableNextAt = otp.availableNextAt;
    return otpResponse;
  }
}

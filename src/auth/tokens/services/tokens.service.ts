import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';

import { isEmail } from '../../../@common/helpers/validate.helper';
import { Otp } from '../../../otp/entities/otp.entity';
import { OtpService } from '../../../otp/services/otp.service';
import { UsersService } from '../../../users/services/users.service';
import { AccessToken } from '../../access-tokens/entities/access-token.entity';
import { AccessTokensService } from '../../access-tokens/services/access-tokens.service';
import { RefreshToken } from '../../refresh-tokens/entities/refresh-token.entity';
import { RefreshTokensService } from '../../refresh-tokens/services/refresh-tokens.service';
import { RegisterOtpResponse } from '../../registers/types/register-otp-response.type';
import { CreateTokenByOtpInput } from '../dto/create-token-by-otp.input';
import { CreateTokenByRefreshTokenInput } from '../dto/create-token-by-refresh-token.input';
import { CreateTokenOtpInput } from '../dto/create-token-otp.input';
import { CreateTokenInput } from '../dto/create-token.input';
import { CreateTokenOtpResponseType } from '../types/create-token-otp-response.type';
import { TokenResponse } from '../types/token-response.type';

const otpSubjectTypeName = 'token';

@Injectable()
export class TokensService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly accessTokensService: AccessTokensService,
    private readonly refreshTokensService: RefreshTokensService,
    private readonly otpService: OtpService,
  ) {}

  async createToken(
    createTokenInput: CreateTokenInput,
  ): Promise<TokenResponse> {
    const { username, password } = createTokenInput;

    let exceptionUser;
    let user;

    try {
      user = isEmail(username)
        ? await this.usersService.findOneByEmailAndPassword(username, password)
        : await this.usersService.findOneByPhoneAndPassword(username, password);
    } catch (e) {
      exceptionUser = e;
    }

    if (exceptionUser || !user) {
      throw new BadRequestException(
        'These credentials do not match our records.',
      );
    }

    const accessToken = await this.accessTokensService.create({
      userId: user.id,
      expiresAt: this.generateAccessTokenExpiresAt(),
    });

    const refreshToken = await this.refreshTokensService.create({
      accessTokenId: accessToken.id,
      userId: accessToken.userId,
      expiresAt: this.generateRefreshTokenExpiresAt(),
    });

    return this.tokenFactory(accessToken, refreshToken);
  }

  async createTokenByOtp(
    createTokenByOtpInput: CreateTokenByOtpInput,
  ): Promise<TokenResponse> {
    const { username, otp } = createTokenByOtpInput;

    let exceptionUser;
    let user;

    try {
      user = await this.usersService.findOneByPhoneNumber(username);
    } catch (e) {
      exceptionUser = e;
    }

    if (exceptionUser || !user) {
      throw new BadRequestException(
        'These credentials do not match our records.',
      );
    }

    const isValidOtp = await this.otpService.isValidExpiry(
      otpSubjectTypeName,
      user.id,
      username,
      otp,
    );

    if (!isValidOtp) {
      throw new BadRequestException('otp is invalid.');
    }

    await this.otpService.revoke(otpSubjectTypeName, user.id, username, otp);

    const accessToken = await this.accessTokensService.create({
      userId: user.id,
      expiresAt: this.generateAccessTokenExpiresAt(),
    });

    const refreshToken = await this.refreshTokensService.create({
      accessTokenId: accessToken.id,
      userId: accessToken.userId,
      expiresAt: this.generateRefreshTokenExpiresAt(),
    });

    return this.tokenFactory(accessToken, refreshToken);
  }

  async createByRefreshToken(
    createTokenByRefreshInput: CreateTokenByRefreshTokenInput,
  ): Promise<TokenResponse> {
    const { accessToken, refreshToken } = createTokenByRefreshInput;

    let decodedAccessToken;
    let decodedRefreshToken;

    try {
      decodedAccessToken = await this.jwtService.verifyAsync(accessToken, {
        ignoreExpiration: true,
      });

      decodedRefreshToken = await this.jwtService.verifyAsync(refreshToken);
    } catch (e) {
      throw new BadRequestException(
        'These credentials do not match our records.',
      );
    }

    const isValidRefreshToken = await this.refreshTokensService.isValidExpiry(
      decodedRefreshToken.jti,
      decodedAccessToken.jti,
    );

    if (!isValidRefreshToken) {
      throw new BadRequestException(
        'These credentials do not match our records.',
      );
    }

    const newAccessToken = await this.accessTokensService.create({
      userId: decodedRefreshToken.sub,
      expiresAt: this.generateAccessTokenExpiresAt(),
    });

    await this.refreshTokensService.updateAccessToken(
      decodedRefreshToken.jti,
      newAccessToken.id,
    );

    return this.tokenFactory(newAccessToken);
  }

  async createTokenOtp(
    createTokenOtpInput: CreateTokenOtpInput,
  ): Promise<CreateTokenOtpResponseType> {
    const { username } = createTokenOtpInput;

    let exceptionUser;
    let user;

    try {
      user = await this.usersService.findOneByPhoneNumber(username);
    } catch (e) {
      exceptionUser = e;
    }

    if (exceptionUser || !user) {
      throw new BadRequestException(
        'These credentials do not match our records.',
      );
    }

    const otp = await this.otpService.create({
      subjectType: otpSubjectTypeName,
      subjectId: user.id,
      phoneNumber: username,
      expiresIn: 120,
    });

    return this.requestOtpFactory(`We have sent your otp!`, otp);
  }

  protected async tokenFactory(
    accessToken: AccessToken,
    refreshToken?: RefreshToken,
  ) {
    const token = new TokenResponse();
    token.expiresAt = Math.round(accessToken.expiresAt.valueOf() / 1000);

    const currentTime = Math.round(new Date().valueOf() / 1000);
    token.accessToken = this.jwtService.sign({
      jti: accessToken.id,
      nbf: currentTime,
      sub: accessToken.userId,
    });

    if (refreshToken) {
      const expires = moment.duration(
        moment(refreshToken.expiresAt).diff(moment()),
      );
      token.refreshToken = await this.jwtService.signAsync(
        {},
        {
          expiresIn: Math.round(expires.asSeconds()),
          jwtid: refreshToken.id,
          subject: accessToken.userId,
        },
      );
    }

    return token;
  }

  protected requestOtpFactory(
    message = 'Success',
    otp: Otp,
  ): RegisterOtpResponse {
    const registerOtpResponse = new RegisterOtpResponse();
    registerOtpResponse.message = message;
    registerOtpResponse.increment = otp.increment;
    registerOtpResponse.availableNextAt = otp.availableNextAt;
    return registerOtpResponse;
  }

  generateAccessTokenExpiresAt(): Date {
    return moment().utc().add(8, 'hours').toDate();
  }

  generateRefreshTokenExpiresAt(): Date {
    return moment().utc().add(30, 'days').toDate();
  }
}

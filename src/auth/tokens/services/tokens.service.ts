import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';
import { Token } from '../../entities/token.entity';
import { AccessTokensService } from '../../access-tokens/services/access-tokens.service';
import { RefreshTokensService } from '../../refresh-tokens/services/refresh-tokens.service';
import { CreateTokenInput } from '../../dto/create-token.input';
import { AccessToken } from '../../access-tokens/entities/access-token.entity';
import { RefreshToken } from '../../refresh-tokens/entities/refresh-token.entity';
import { UsersService } from '../../../users/services/users.service';

@Injectable()
export class TokensService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(UsersService.name)
    private readonly usersService: UsersService,
    @Inject(AccessTokensService.name)
    private readonly accessTokensService: AccessTokensService,
    @Inject(RefreshTokensService.name)
    private readonly refreshTokensService: RefreshTokensService,
  ) {}

  async create(createTokenInput: CreateTokenInput): Promise<Token> {
    const { username, password } = createTokenInput;

    let user = null;

    try {
      user = this.isEmail(username)
        ? await this.usersService.findOneByEmailAndPassword(username, password)
        : await this.usersService.findOneByPhoneAndPassword(username, password);
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw new BadRequestException(
          'These credentials do not match our records.',
        );
      }

      throw e;
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

  async tokenFactory(accessToken: AccessToken, refreshToken?: RefreshToken) {
    const token = new Token();
    token.expiresAt = Math.ceil(accessToken.expiresAt.valueOf() / 1000);

    const currentTime = Math.ceil(new Date().valueOf() / 1000);
    token.accessToken = this.jwtService.sign({
      jti: accessToken.id,
      nbf: currentTime,
      sub: accessToken.userId,
    });

    if (refreshToken) {
      token.refreshToken = await this.jwtService.signAsync(
        {},
        {
          expiresIn: Math.ceil(refreshToken.expiresAt.valueOf() / 1000),
          jwtid: refreshToken.id,
          subject: accessToken.userId,
        },
      );
    }

    return token;
  }

  generateAccessTokenExpiresAt(): Date {
    const date = moment().add(8, 'hours');
    return date.utc().toDate();
  }

  generateRefreshTokenExpiresAt(): Date {
    const date = moment().add(30, 'days');
    return date.utc().toDate();
  }

  isEmail(email: string): boolean {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}

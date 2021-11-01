import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UsersService } from '../../users/services/users.service';
import { AccessTokensService } from '../access-tokens/services/access-tokens.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly accessTokenServices: AccessTokensService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any): Promise<any> {
    const { jti, sub } = payload;
    const isValidAccessToken = await this.accessTokenServices.isValidExpiry(
      jti,
    );

    if (!isValidAccessToken) return null;

    try {
      return this.usersService.findOne(sub);
    } catch (e) {
      return null;
    }
  }
}

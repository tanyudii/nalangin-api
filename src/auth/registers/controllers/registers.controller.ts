import { Body, Controller, Post } from '@nestjs/common';

import { RegisterInput } from '../dto/register.input';
import { RegisterMessage } from '../entities/register-message.entity';
import { RegistersService } from '../services/registers.service';

@Controller('register')
export class RegistersController {
  constructor(private readonly registersService: RegistersService) {}

  @Post()
  async register(
    @Body() registerInput: RegisterInput,
  ): Promise<RegisterMessage> {
    return this.registersService.register(registerInput);
  }
}

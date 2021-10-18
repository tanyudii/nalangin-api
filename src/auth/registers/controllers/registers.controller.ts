import { Body, Controller, Post } from '@nestjs/common';
import { RegistersService } from '../services/registers.service';
import { RegisterInput } from '../dto/register.input';
import { RegisterMessage } from '../entities/register-message.entity';

@Controller('registers')
export class RegistersController {
  constructor(private readonly registersService: RegistersService) {}

  @Post()
  register(@Body() registerInput: RegisterInput): Promise<RegisterMessage> {
    return this.registersService.register(registerInput);
  }
}

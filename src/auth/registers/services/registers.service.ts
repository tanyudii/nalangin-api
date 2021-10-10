import { Injectable } from '@nestjs/common';
import { RegisterInput } from '../dto/register.input';
import { UsersService } from '../../../users/services/users.service';
import { RegisterMessage } from '../entities/register-message.entity';

@Injectable()
export class RegistersService {
  constructor(private readonly usersService: UsersService) {}

  async register(registerInput: RegisterInput): Promise<RegisterMessage> {
    const { name, email, password } = registerInput;

    await this.usersService.create({
      name,
      email,
      password,
    });

    return this.registerMessageFactory(`Hi ${name}, for now we are family :)`);
  }

  registerMessageFactory(message = 'Success'): RegisterMessage {
    const passwordMessage = new RegisterMessage();
    passwordMessage.message = message;
    return passwordMessage;
  }
}

import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserCredentialsRequestDTO, SaveNewUserResponseDTO, LoginResponseDTO } from './models/auth.dtos';

@Controller('v1/auth')
export class AuthController {
    constructor(private authSvc: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() user: UserCredentialsRequestDTO): Promise<LoginResponseDTO> {
        return await this.authSvc.login(user.username);
    }

    @Post('register')
    async register(@Body() newUser: UserCredentialsRequestDTO): Promise<SaveNewUserResponseDTO> {
        return await this.authSvc.registerUser(newUser);
    }
}

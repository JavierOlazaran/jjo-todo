import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RegisterUserRequestDTO } from '../user/model/user.model';

@Controller('auth')
export class AuthController {
    constructor(private authSvc: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() user) {
        return await this.authSvc.login(user.username);
    }

    @Post('register')
    async register(@Body() newUser: RegisterUserRequestDTO) {
        return await this.authSvc.registerUser(newUser);
    }
}

import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { RegisterUserRequestDTO } from 'src/user/model/user.model';

@Controller('auth')
export class AuthController {
    constructor(private authSvc: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return await this.authSvc.login(req.user);
    }

    @Post('register')
    async register(@Body() newUser: RegisterUserRequestDTO) {
        return await this.authSvc.registerUser(newUser);
    }
}

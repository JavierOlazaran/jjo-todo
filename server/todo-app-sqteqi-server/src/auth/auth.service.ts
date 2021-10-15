import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private jwt: JwtService,
        private userSvc: UserService    
    ) {}

    async validateCredentials(userName: string, password: string): Promise<any> {
        const user = this.userSvc.findUser(userName);
        if (user && user.password === password) return user.userName;
        return null;
    }

    async login(user: string) {
        return {access_token: this.jwt.sign({user: user})};
    }
}

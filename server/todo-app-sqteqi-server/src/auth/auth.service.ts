import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserResponseDTO, SaveNewUserResponseDTO, UserCredentialsRequestDTO } from './models/auth.dtos';

@Injectable()
export class AuthService {

    constructor(
        private jwt: JwtService,
        private userSvc: UserService
    ) {}
    
    async login(user: string): Promise<LoginUserResponseDTO> {
        return {access_token: this.jwt.sign({user: user})};
    }

    async validateCredentials(userName: string, password: string): Promise<any> {
        const user = await this.userSvc.findUser(userName);
        if (user && user.password === password) return user.username;
        return null;
    }

    async registerUser(newUser: UserCredentialsRequestDTO): Promise<SaveNewUserResponseDTO> {
        const newUserName = await this.userSvc.saveNewUser(newUser);
        return { user: newUserName }
    }

    async retrieveJwtPayload(jwtToken: string) {
        return this.jwt.decode(jwtToken);
    }

    async getUserNameFromToken(jwtToken: string) {
        const token = jwtToken.replace('Bearer ', '');
        const payload = await this.retrieveJwtPayload(token);
        console.log('payload', payload);
        
        const userName = payload["user"];

        return userName;
    }
}

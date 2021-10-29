import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserResponseDTO, SaveNewUserResponseDTO, UserCredentialsRequestDTO } from './models/auth.dtos';
import { JWTTokenPayload } from './models/auth.classes';

@Injectable()
export class AuthService {

    constructor(
        private jwt: JwtService,
        private userSvc: UserService
    ) {}
    
    async login(user: string): Promise<LoginUserResponseDTO> {
        return {access_token: this.jwt.sign({user: user})};
    }

    async validateCredentials(userName: string, password: string): Promise<string | null> {
        const user = await this.userSvc.findUser(userName);
        if (user && user.password === password) return user.username;
        return null;
    }

    async registerUser(newUser: UserCredentialsRequestDTO): Promise<SaveNewUserResponseDTO> {
        const newUserName = await this.userSvc.saveNewUser(newUser);
        return { user: newUserName }
    }

    retrieveJwtPayload(jwtToken: string): JWTTokenPayload {
        const payload: string | {[key:string]: any} = this.jwt.decode(jwtToken);
        const [_user, _exp, _iat] = [payload["user"], payload["exp"], payload["iat"]]
        return {user: _user, exp: _exp, iat: _iat};
    }

    async getUserNameFromToken(jwtToken: string): Promise<string> {
        const token = jwtToken.replace('Bearer ', '');
        const payload = await this.retrieveJwtPayload(token);
        console.log('payload', payload);

        const userName = payload["user"];

        return userName;
    }
}

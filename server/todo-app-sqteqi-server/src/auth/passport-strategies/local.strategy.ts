import { AuthService } from 'src/auth/auth.service';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authSvc: AuthService){
        super();
    }

    async validate(username: string, password: string) {
        const validatedUser = this.authSvc.validateCredentials(username, password);

        if (!validatedUser) throw new UnauthorizedException();
        return validatedUser;
    }
}
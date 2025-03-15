import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ROLE } from 'src/constants/enum';

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(private readonly allowedROLEs: ROLE[]) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user || !user.ROLE || !this.allowedROLEs.includes(user.ROLE)) {
            throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
        }

        return true;
    }
}

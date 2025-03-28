import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IJwtPayload } from 'src/modules/jwt/jwt.interface';

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): IJwtPayload => {
        const request = ctx.switchToHttp().getRequest();
        return request.user as IJwtPayload;
    },
);

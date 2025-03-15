import { UseGuards } from '@nestjs/common';
import { ROLE } from 'src/constants/enum';
import { AuthorizationGuard } from 'src/guards/authorization.guard';

export function Authorization(roles: ROLE[]) {
    return UseGuards(new AuthorizationGuard(roles));
}

import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/authentication.guard';

export function Authentication() {
    return UseGuards(AuthGuard);
}

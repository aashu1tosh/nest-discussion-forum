import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';

export function Authentication() {
    return UseGuards(AuthGuard);
}

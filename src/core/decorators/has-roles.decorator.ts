import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/app/modules/auth/auth.constants';

export const HasRoles = (...roles: Role[]) => SetMetadata('roles', roles);
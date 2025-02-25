import { Body, Controller, Post } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Post('signup')
    async signupUser(@Body() data: Prisma.UserCreateInput): Promise<User> {
        return this.userService.createUser(data);
    }
}

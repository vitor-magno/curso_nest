import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {

    constructor(private primaService: PrismaService) { }

    //Cria um usuário
    async createUser(data: Prisma.UserCreateInput) {
        const hashPassword = await bcrypt.hash(data.password, 10);
        data.password = hashPassword
        return this.primaService.user.create({ data });
    }

    //Pega um usuário específico
    async user(
        userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    ): Promise<User | null> {
        return this.primaService.user.findUnique({
            where: userWhereUniqueInput,
        });
    }

    // Atualiza um usuário
    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User> {
        const { where, data } = params;
        return this.primaService.user.update({ where, data });
    }

    // Deleta um usuário
    async deleteUser(where: Prisma.UserWhereUniqueInput) {
        return this.primaService.user.delete({ where });
    }

}

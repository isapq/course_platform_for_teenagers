import prisma from "../lib/prisma.js";
import { CreateUserData } from "../dtos/create-user.dto.js";

export class UserRepository {
    async findByEmail(email: string) {
        return prisma.user.findUnique({
            where: {
                email: email,
            }
        })
    }

    async createUser(data: CreateUserData) {
        return prisma.user.create({
            data: {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                password: data.password,
            }
        })
    }

    async findById(id: string) {
        return prisma.user.findUnique({
            where: {
                id: id,
            }
        })
    }

    async modifyPassword(id: string, newPassword: string) {
        return prisma.user.update({
            where: {
                id: id,
            },
            data: {
                password: newPassword,
            },
        })
    }
}
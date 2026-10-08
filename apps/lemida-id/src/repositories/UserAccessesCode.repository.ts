import prisma from "../lib/prisma.js";
import { randomBytes } from "crypto";

export class UserAccessesCodeRepository {

    async findCode(id: string, code: string) {
        return await prisma.userAccessesCode.findFirst({
            where: {
                user_id: id,
                code,
                used: false,
            },
        });
    };

    async createCode(id: string) {
        const code = randomBytes(3).toString("hex").toUpperCase();

        const expires_at = new Date(
            Date.now() + 15 * 60 * 1000
        );

        return await prisma.userAccessesCode.create({
            data: {
                code,
                user_id: id,
                used: false,
                expires_at,
            }
        });
    };

    async updateIsUsed(code_id: string) {
        return await prisma.userAccessesCode.update({
            where: {
                id: code_id,
            },
            data: {
                used: true,
            }
        })
    }
};
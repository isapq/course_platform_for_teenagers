import { UserAccessesCodeRepository } from "../repositories/UserAccessesCode.repository.js";
import { UserRepository } from "../repositories/user.repository.js";

export class userAccessesCodeService {

    private UserAccessesCodeRepository = new UserAccessesCodeRepository();
    private UserRepository = new UserRepository();

    async newCode(email: string) {

        const user = await this.UserRepository.findByEmail(email);

        if (!user) {
            throw new Error("Usuário não localizado pelo e-mail.");
        }

        const code = await this.UserAccessesCodeRepository.createCode(user.id);

        if (!code) {
            throw new Error("Falha ao tentar criar o código.");
        }

        return {
            first_name: user.first_name,
            code: code.code,
            email: user.email
        };
    }

    async validateCode(email: string, code: string) {

        const user = await this.UserRepository.findByEmail(email);

        if (!user) {
            throw new Error("Usuário não localizado pelo e-mail.");
        }

        const codeData =
            await this.UserAccessesCodeRepository.findCode(
                user.id,
                code
            );

        if (!codeData) {
            throw new Error("Código inválido.");
        }

        if (codeData.expires_at < new Date()) {
            throw new Error("Código expirou.");
        }

        await this.UserAccessesCodeRepository.updateIsUsed(codeData.id)

        return {
            valid: true
        };
    }
}
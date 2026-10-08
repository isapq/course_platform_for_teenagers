import { UserRepository } from "../repositories/user.repository.js";
import { CreateUserData } from "../dtos/create-user.dto.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
    private userRepository = new UserRepository();

    async register(data: CreateUserData) {
        const existDataBase = await this.userRepository.findByEmail(data.email);

        if (existDataBase) {
            throw new Error("Já existe cadastro com esse e-mail.");
        };

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const userData = {
            ...data,
            password: hashedPassword,
        }

        const user = await this.userRepository.createUser(userData);

        return {
            id: user.id,
            first_name: user.first_name,
            email: user.email,
        };
    };

    async login(email: string, password: string) {
        const existUser = await this.userRepository.findByEmail(email);

        if (!existUser) {
            throw new Error("Não existe usuário com esse e-mail.")
        }
        
        const passwordIsValid = await bcrypt.compare(
            password,
            existUser.password
        )
                
        if (!passwordIsValid) {
            throw new Error("Senha inválida.")
        }

        const accessToken = jwt.sign(
            {
                id: existUser.id,
                email: existUser.email,
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: "1d",
            }
        );

        return {
            "token": accessToken,
            "user": {
                "id": existUser.id,
                "first_name": existUser.first_name,
                "last_name": existUser.last_name,
                "email": existUser.email
            }
        }
    }

    async modifyPassword(id: string, oldPassword: string, newPassword: string) {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new Error("Usuário não localizado.")
        };

        const passwordIsValid = await bcrypt.compare(
            oldPassword,
            user.password
        );

        if (!passwordIsValid) {
            throw new Error("Senha inválida.")
        };

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        const chagePassword = await this.userRepository.modifyPassword(id, hashedNewPassword);

        return {
            "user": {
                "id": user.id,
                "first_name": user.first_name,
                "email": user.email
            }
        }
    }
};
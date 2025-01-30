// src/pages/api/auth/signup.js
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { name, email, password } = req.body;

        // Verificar se o email já existe
        const userExists = await prisma.user.findUnique({
        where: { email },
        });

        if (userExists) {
        return res.status(400).json({ error: "Este email já está em uso." });
        }

        // Criptografar a senha
        const hashedPassword = bcrypt.hashSync(password, 10);

        try {
        // Criar o usuário
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });
            return res.status(201).json({ user });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Erro ao criar conta. Tente novamente." });
        }
    } else {
        res.status(405).json({ error: "Método não permitido" });
    }
}

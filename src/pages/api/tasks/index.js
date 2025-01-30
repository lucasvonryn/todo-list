import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { title, userId } = req.body;

        try {
            const task = await prisma.task.create({
                data: {
                title,
                userId,
                },
            });
            res.status(201).json(task);
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: "Erro ao criar tarefa" });
        }
    } else if (req.method === "GET") {
        const { userId } = req.query;

        try {
            const tasks = await prisma.task.findMany({
                where: {
                userId: Number(userId),
                },
            });
            res.status(200).json(tasks);
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: "Erro ao buscar tarefas" });
        }
    }
}

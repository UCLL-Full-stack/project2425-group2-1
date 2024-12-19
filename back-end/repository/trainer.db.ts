import database from '../util/database';
import { Trainer } from '../model/trainer';
import { TrainerInput } from '../types';

const getAllTrainers = async (): Promise<Trainer[]> => {
    try {
        const trainersPrisma = await database.trainer.findMany({
            include: {
                attendances: true, // Include related attendances
            },
        });
        return trainersPrisma.map((trainerPrisma) => Trainer.from(trainerPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createTrainer = async (trainerData: TrainerInput): Promise<Trainer> => {
    const { name, language_spoken, password, availability } = trainerData;

    try {
        const trainerPrisma = await database.trainer.create({
            data: {
                name,
                password,
                language_spoken,
                availability,
            },
            include: {
                attendances: true, // Include attendances after creation if needed
            },
        });

        return Trainer.from(trainerPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getTrainersByAvailability = async (availability: boolean): Promise<Trainer[]> => {
    try {
        const trainersPrisma = await database.trainer.findMany({
            where: { availability },
            include: {
                attendances: true, // Include attendances based on availability
            },
        });

        return trainersPrisma.map((trainerPrisma) => Trainer.from(trainerPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getTrainerById = async (id: number): Promise<Trainer | null> => {
    try {
        const trainerPrisma = await database.trainer.findUnique({
            where: { id },
            include: {
                attendances: true, // Include attendances for a single trainer
            },
        });
        if (!trainerPrisma) return null;
        return Trainer.from(trainerPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getTrainerByUsername = async ({ name }: { name: string }): Promise<Trainer | null> => {
    try {
        const trainerPrisma = await database.trainer.findUnique({
            where: { name },
            include: {
                attendances: true, // Optionally include attendance data if needed
            },
        });
        return trainerPrisma ? Trainer.from(trainerPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllTrainers,
    createTrainer,
    getTrainersByAvailability,
    getTrainerById,
    getTrainerByUsername,
};

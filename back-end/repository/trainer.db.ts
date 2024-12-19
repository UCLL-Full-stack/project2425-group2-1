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
    const { name, language_spoken, availability } = trainerData;

    try {
        const trainerPrisma = await database.trainer.create({
            data: {
                name,
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

export default {
    getAllTrainers,
    createTrainer,
    getTrainersByAvailability,
    getTrainerById,
};

import database from '../util/database';
import { Trainer } from '../model/trainer';
import { TrainerInput } from '../types';

const getAllTrainers = async (): Promise<Trainer[]> => {
    try {
        const trainersPrisma = await database.trainer.findMany();
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

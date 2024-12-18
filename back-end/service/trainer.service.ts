import trainerDB from '../repository/trainer.db';  // Importing the trainer database functions
import { Trainer } from '../model/trainer';  // Importing the Trainer model
import { TrainerInput } from '../types';

// Service method to fetch all trainers
const getAllTrainers = async (): Promise<Trainer[]> => {
    try {
        return await trainerDB.getAllTrainers();  // Call the getAllTrainers function from trainerDB
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching all trainers.');
    }
};

// Service method to fetch a trainer by their ID
const getTrainerById = async (id: number): Promise<Trainer> => {
    try {
        const trainer = await trainerDB.getTrainerById( id );  // Call the getTrainerById function from trainerDB
        if (!trainer) {
            throw new Error(`Trainer with id ${id} does not exist.`);  // Error if trainer not found
        }
        return trainer;
    } catch (error) {
        console.error(error);
        throw new Error(`Error fetching trainer with id ${id}.`);
    }
};

// Service method to fetch trainers by availability
const getTrainersByAvailability = async (availability: boolean): Promise<Trainer[]> => {
    try {
        return await trainerDB.getTrainersByAvailability(availability );  // Fetch trainers by availability from trainerDB
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching trainers by availability.');
    }
};

// Service method to create a new trainer
const createTrainer = async (trainerData: TrainerInput): Promise<Trainer> => {
    try {
        return await trainerDB.createTrainer(trainerData);  // Create a new trainer via trainerDB
    } catch (error) {
        console.error(error);
        throw new Error('Error creating trainer.');
    }
};

// Export the service methods for use in other parts of the application
export default {
    getAllTrainers,
    getTrainerById,
    getTrainersByAvailability,
    createTrainer,
};
